<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function me(Request $rq) {
        return $rq->user("sanctum");
    }

    public function login(Request $rq) {
        $userData = $rq->validate([
            "name" => "required|string",
            "password" => "required|min:8"
        ]);

        if (Auth::attempt($userData)) {
            $rq->session()->regenerate();
            return response()->json(["message" => "Logged in"]);
        }

        return response()->json(["message" => "Login failed"], 401);
    }

    public function logout(Request $rq) {
        $rq->user()->tokens()->delete();
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
            "password" => Hash::make($userData["password"]),
        ]);

        Auth::login($user);
        $rq->session()->regenerate();

        return response()->json(["message" => "User created"]);
    }
}
