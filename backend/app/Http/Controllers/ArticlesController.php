<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function list(Request $rq) {
        $test = "Now I'm returning everything I have";
        $articles = [];

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
            $test .= " • from categories " . $rq->sources;
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

        return response()->json([
            "articles" => $articles,
        ]);
    }
}
