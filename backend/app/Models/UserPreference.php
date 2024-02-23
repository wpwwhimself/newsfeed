<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "user_preference_type_id",
        "value",
    ];

    protected $with = ["type"];

    public function type() {
        return $this->belongsTo(UserPreferenceType::class, "user_preference_type_id");
    }
}
