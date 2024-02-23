<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function list(Request $rq) {
        $articles = ["Now I'm returning everything I have"];

        if ($rq->keyword) {
            $articles[] = "with keyword " . $rq->keyword;
        }
        if ($rq->dateFrom) {
            $articles[] = "since " . $rq->dateFrom;
        }
        if ($rq->dateTo) {
            $articles[] = "until " . $rq->dateTo;
        }
        if ($rq->categories) {
            $articles[] = "from categories " . $rq->categories;
        }
        if ($rq->sources) {
            $articles[] = "from categories " . $rq->sources;
        }

        return response()->json([
            "articles" => $articles,
        ]);
    }
}
