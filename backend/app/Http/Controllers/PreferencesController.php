<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use App\Models\UserPreferenceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PreferencesController extends Controller
{
    public function list() {
        $data = UserPreference::all()->toArray();

        return response()->json($data);
    }

    public function update(Request $rq) {
        // clear current preferences
        UserPreference::where("user_id", Auth::id())
            ->where("user_preference_type_id", $rq->type)
            ->delete()
        ;

        // replace them with new ones
        foreach($rq->preferences as $pref) {
            UserPreference::create([
                "user_id" => Auth::id(),
                "user_preference_type_id" => $rq->type,
                "value" => $pref,
            ]);
        }

        $type_name = UserPreferenceType::find($rq->type)->name;

        return response()->json(["message" => Str::ucfirst($type_name) . " list updated"]);
    }
}
