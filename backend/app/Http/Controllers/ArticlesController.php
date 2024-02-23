<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function list(Request $rq) {
        $articles = ["Now I'm returning everything I have"];

        if ($rq->keyword) {
            $articles[0] .= ", with keyword " . $rq->keyword;
        }

        return response()->json([
            "articles" => $articles,
        ]);
    }
}
