<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferencesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get("/hellothere", function () {
    return response()->json("general kenobi");
});

Route::controller(AuthController::class)->group(function () {
    Route::get("me", "me");

    foreach(["register", "login"] as $route) {
        Route::post($route, $route);
    }

    Route::middleware("auth:sanctum")->group(function () {
        Route::post("logout", "logout");
    });
});

Route::middleware("auth:sanctum")->controller(PreferencesController::class)->prefix("preference")->group(function () {
    Route::get("/", "list");
    Route::post("/update", "update");
});
