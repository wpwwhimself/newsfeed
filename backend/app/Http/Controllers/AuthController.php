<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function me(Request $rq) {
        return $rq->user();
    }

    public function login(Request $rq) {
        $userData = $rq->validate([
            "name" => "required|string",
            "password" => "required|min:8"
        ]);

        $user = User::where("name", $userData["name"])->first();
        if(!$user || !Hash::check($userData["password"], $user->password)){
            return response()->json(["message" => 'Invalid credentials'], 401);
        }

        return response()->json(["message" => "Logged in"]);
    }

    public function logout(Request $rq) {
        Auth::logout();
        $rq->session()->invalidate();
        $rq->session()->regenerateToken();

        return response()->json(["message" => "Logged out"]);
    }

    public function register(Request $rq) {
        $userData = $rq->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users",
            "password" => "required|min:8",
        ]);

        $user = User::create([
            "name" => $userData["name"],
            "email" => $userData["email"],
            "password" => Hash::make($userData["name"]),
        ]);

        return response()->json(["message" => "User created"]);
    }
}
