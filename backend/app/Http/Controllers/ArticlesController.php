<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Setting;
use App\Models\UserPreference;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ArticlesController extends Controller
{
    public function list(Request $rq) {
        $articles = Article::orderByDesc("published_at");
        $filters = [];

        if ($rq->keyword) {
            $filters["keyword"] = $rq->keyword;
            $articles = $articles->where("title", "regexp", $rq->keyword)
                ->orWhere("description", "regexp", $rq->keyword)
                ->orWhere("content", "regexp", $rq->keyword)
            ;
        }
        if ($rq->dateFrom) {
            $filters["dateFrom"] = $rq->dateFrom;
            $articles = $articles->where("published_at", ">=", $rq->dateFrom);
        }
        if ($rq->dateTo) {
            $filters["dateTo"] = $rq->dateTo;
            $articles = $articles->where("published_at", "<=", $rq->dateTo);
        }

        $_articles = clone $articles;
        $categories = $_articles->get()->pluck("category")->unique()->values();
        $sources = $_articles->get()->pluck("source")->unique()->values();

        if ($rq->categories) {
            $_categories = explode(",", $rq->categories);
            $filters["categories"] = $_categories;
            $articles = $articles->whereIn("category", $_categories);
        }
        if ($rq->sources) {
            $_sources = explode(",", $rq->sources);
            $filters["sources"] = $_sources;
            $articles = $articles->whereIn("source", $_sources);
        }

        if (Auth::check() && UserPreference::where("user_id", Auth::id())->count()) {
            foreach (["sources", "categories", "authors"] as $type) {
                $prefs = UserPreference::where("user_id", Auth::id())
                    ->whereHas("type", function ($q) use ($type) { $q->where("name", $type); })
                    ->get()
                ;
                if ($prefs->count()) {
                    $_prefs = $prefs->pluck("value")->values();
                    $filters["user_$type"] = $_prefs;
                    $articles = $articles->whereIn(Str::singular($type), $_prefs);
                }
            }
        }

        $articles = $articles->get();

        return response()->json(compact(
            "articles",
            "categories",
            "sources",
            "filters",
        ));
    }

    public function obtain() {
        $topics = [
            "cooking",
            "finance",
            "politics",
        ];

        $last_updated = Setting::find("last_data_sync")?->value("value")
            ?? Carbon::now()->subWeek()->toIso8601String();

        $pull_count = 0;
        foreach ($topics as $topic) {
            $pull_count += $this->obtainFromNewsAPI($topic, $last_updated);
        }

        Setting::find("last_data_sync")->update(["value" => Carbon::now()->toIso8601String()]);

        return response()->json(["message" => "Articles updated", "pull_count" => $pull_count]);
    }

    private function obtainFromNewsAPI(string $topic, string $last_updated) {
        $response = Http::get("https://newsapi.org/v2/everything", [
            "q" => "$topic",
            "from" => $last_updated,
            "language" => "en",
            "apiKey" => env("NEWSAPI_APIKEY"),
        ]);

        Article::insert(
            array_filter(
                Arr::map($response->json()["articles"], fn($article) => [
                    "title" => $article["title"],
                    "description" => $article["description"],
                    "content" => $article["content"],
                    "source" => $article["source"]["name"],
                    "category" => $topic,
                    "author" => $article["author"],
                    "url" => $article["url"],
                    "url_to_image" => $article["urlToImage"],
                    "published_at" => Carbon::parse($article["publishedAt"]),
                ]),
                fn($article) => $article["title"] != "[Removed]"
            )
        );

        return count($response->json()["articles"]);
    }
}
