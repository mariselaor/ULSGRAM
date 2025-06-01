<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\DashboardController;

// Ruta principal redirige al formulario de login
Route::get('/', [LoginController::class, 'showLoginForm'])->name('login');

// Login
Route::get('/login', [LoginController::class, 'showLoginForm']);
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Registro
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('register.submit');

// Recuperar contraseña
Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');

// Ruta protegida: dashboard y gestión usuarios
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/users/{id}/edit', [DashboardController::class, 'edit'])->name('users.edit');
    Route::put('/dashboard/users/{id}', [DashboardController::class, 'update'])->name('users.update');
    Route::delete('/dashboard/users/{id}', [DashboardController::class, 'destroy'])->name('users.destroy');
    Route::post('/dashboard/users/{id}/toggle-block', [DashboardController::class, 'toggleBlock'])->name('users.toggle-block');
});
