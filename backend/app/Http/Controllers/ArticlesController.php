<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Setting;
use App\Models\UserPreference;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ArticlesController extends Controller
{
    public function list(Request $rq) {
        $articles = Article::orderByDesc("published_at")->get();

        if ($rq->keyword) {
            // $articles = $articles->where("")
        }
        if ($rq->dateFrom) {
            // $test .= " • since " . $rq->dateFrom;
        }
        if ($rq->dateTo) {
            // $test .= " • until " . $rq->dateTo;
        }
        if ($rq->categories) {
            // $test .= " • from categories " . $rq->categories;
        }
        if ($rq->sources) {
            // $test .= " • from sources " . $rq->sources;
        }

        if (Auth::check() && UserPreference::where("user_id", Auth::id())->count()) {
            foreach (["sources", "categories", "authors"] as $type) {
                $prefs = UserPreference::where("user_id", Auth::id())
                    ->whereHas("type", function ($q) use ($type) {
                        $q->where("name", $type);
                    })
                    ->get()
                ;
                if ($prefs->count()) {
                    // $test .= " • from user's $type " . $prefs->implode("value", ",");
                }
            }
        }

        $categories = ["test", "test2", "ever"];
        $sources = ["s1", "s4"];

        return response()->json(compact(
            "articles",
            "categories",
            "sources",
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
