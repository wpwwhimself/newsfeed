<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserPreferenceTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("user_preference_types")->insert([
            ["name" => "sources"],
            ["name" => "categories"],
            ["name" => "authors"],
        ]);
    }
}
