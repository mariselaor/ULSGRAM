<?php

use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use Illuminate\Support\Facades\Route;

// Login (POST) - para autenticar usuario
Route::post('/login', [AuthController::class, 'login']);

// Mensaje para GET /login indicando que no está permitido
Route::get('/login', function () {
    return response()->json(['message' => 'Método GET no permitido, usa POST.'], 405);
});

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/perfil', [PerfilController::class, 'store']);
});
