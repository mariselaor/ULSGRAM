<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Listar todas las publicaciones (pública)
Route::get('/publicaciones', [PublicacionController::class, 'index']);
// Rutas protegidas para usuarios autenticados
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Listar publicaciones (GET)
    Route::get('/publicaciones', [PublicacionController::class, 'index']);
    
    // Crear publicación (POST)
    Route::post('/publicaciones', [PublicacionController::class, 'store']);

    // Mostrar detalle de publicación
    Route::get('/publicaciones/{id}', [PublicacionController::class, 'show']);

    // Like a publicación
    Route::post('/publicaciones/{id}/like', [PublicacionController::class, 'like']);

    // Comentarios
    Route::get('/publicaciones/{id}/comentarios', [PublicacionController::class, 'comentarios']);
    Route::post('/publicaciones/{id}/comentarios', [PublicacionController::class, 'comentar']);
    Route::get('/publicaciones/{publicacion}/comentarios', [ComentarioController::class, 'index']);
    Route::post('/publicaciones/{publicacion}/comentarios', [ComentarioController::class, 'store']);

    // Subir archivo
    Route::post('/upload', [UploadController::class, 'store']);

    // Usuarios
    Route::get('/usuarios', [UserController::class, 'index']);
    Route::get('/usuarios/recent', [UserController::class, 'recent']);
});

// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::resource('roles', RoleController::class);
});
