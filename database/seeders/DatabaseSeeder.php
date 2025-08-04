<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'user@taskmanager.com',
        ], [
            'name' => 'User 1',
            'password' => 123456
        ]);

        User::updateOrCreate([
            'email' => 'user2@taskmanager.com',
        ], [
            'name' => 'User 2',
            'password' => 123456
        ]);
    }
}
