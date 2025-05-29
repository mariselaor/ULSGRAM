<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UploadController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/publicaciones', [PublicacionController::class, 'store']); // Obtener todas las publicaciones

// Rutas protegidas para usuarios autenticados
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'userProfile']); // Perfil de usuario
    Route::post('/logout', [AuthController::class, 'logout']); // Cerrar sesión
    Route::get('/publicacion', [PublicacionController::class, 'index']); // Crear publicación
    Route::post('/publicacion/{id}', [PublicacionController::class, 'show']); // Detalle de publicación
    Route::post('/upload', [UploadController::class, 'store']); // Subir archivo
});

// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::resource('roles', RoleController::class); // Gestión de roles
});
