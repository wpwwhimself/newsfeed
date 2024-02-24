<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $dates = ["published_at"];

    protected $fillable = [
        "title", "description", "content",
        "source", "category", "author",
        "url", "url_to_image",
        "published_at",
    ];
}
