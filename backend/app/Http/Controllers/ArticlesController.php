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
        $test = "Now I'm returning everything I have";
        $articles = [];
        $categories = ["test", "test2", "ever"];
        $sources = ["s1", "s4"];

        if ($rq->keyword) {
            $test .= " • with keyword " . $rq->keyword;
        }
        if ($rq->dateFrom) {
            $test .= " • since " . $rq->dateFrom;
        }
        if ($rq->dateTo) {
            $test .= " • until " . $rq->dateTo;
        }
        if ($rq->categories) {
            $test .= " • from categories " . $rq->categories;
        }
        if ($rq->sources) {
            $test .= " • from sources " . $rq->sources;
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
                    $test .= " • from user's $type " . $prefs->implode("value", ",");
                }
            }
        }

        $articles = [
            [
                "title" => "Boobs",
                "description" => $test,
                "content" => "Cillum eiusmod amet non adipisicing laboris dolor magna Lorem aliqua dolore. Ad minim sit fugiat nulla labore id nulla non est esse ea consectetur sit dolor. Non nostrud ipsum laborum id eiusmod duis cupidatat minim eiusmod ad aute esse ex. Velit irure cupidatat reprehenderit irure exercitation magna ullamco proident. Consectetur adipisicing laboris sint irure duis ullamco labore officia anim mollit officia ea. Ullamco aliquip sit ad proident pariatur enim.",
                "source" => "my brain",
                "author" => "Tomasz Torpeda",
                "url" => "http://test.test/",
                "url_to_image" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNlGaKuBp12MkLX0gKzZLkV1ZAcry1_nWZpeMLs_c7HQ&s",
                "published_at" => Carbon::now(),
            ],
        ];

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

        $last_updated = Setting::find("last_data_sync")?->get("value")
            ?? Carbon::now()->subWeek();

        foreach ($topics as $topic) {
            $this->obtainFromNewsAPI($topic, $last_updated);

        }

        Setting::find("last_data_sync")->update(["value" => Carbon::now()]);

        return response()->json(["message" => "Articles updated"]);
    }

    private function obtainFromNewsAPI(string $topic, string | Carbon $last_updated) {
        $response = Http::get("https://newsapi.org/v2/everything", [
            "q" => $topic,
            "from" => $last_updated,
            "apiKey" => env("NEWSAPI_APIKEY"),
        ]);

        Article::insert(
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
            ])
        );
    }
}
