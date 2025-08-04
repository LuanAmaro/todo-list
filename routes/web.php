<?php

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\Tasks\TasksController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [TasksController::class, 'dashboard'])->name('dashboard');

    Route::post('/tasks', [TasksController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [TasksController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [TasksController::class, 'destroy'])->name('tasks.destroy');
    Route::patch('/tasks/{task}/toggle', [TasksController::class, 'toggleStatus'])->name('tasks.toggle');

    Route::post("/logout", [AuthenticateController::class, "logout"])->name("auth.logout");
});

Route::get("/login", [AuthenticateController::class, "login"])->name("auth.login");
Route::post("/authenticate", [AuthenticateController::class, "authenticate"])->name("auth.authenticate");
Route::post("/register", [AuthenticateController::class, "store"])->name("auth.register");
