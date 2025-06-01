<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/publicaciones', [PublicacionController::class, 'index']);

// Rutas protegidas para usuarios autenticados
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Publicaciones
    Route::post('/publicaciones', [PublicacionController::class, 'store']);
    Route::get('/publicaciones/{id}', [PublicacionController::class, 'show']);
    Route::post('/publicaciones/{id}/like', [PublicacionController::class, 'like']);
    Route::post('/publicaciones/{publicacion}/comentarios', [ComentarioController::class, 'store']);
    
     // Comentarios
    Route::get('/publicaciones/{publicacion}/comentarios', [ComentarioController::class, 'index']);
    Route::post('/publicaciones/{publicacion}/comentarios', [ComentarioController::class, 'store']);

    // Likes
    Route::post('/publicaciones/{publicacion}/like', [LikeController::class, 'toggleLike']);
    
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