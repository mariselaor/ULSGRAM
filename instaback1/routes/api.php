<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;


Route::middleware('auth:api')->post('/upload', [UploadController::class, 'store']);
// Rutas públicas
Route::middleware('auth:sanctum')->post('/publicaciones', [PublicacionController::class, 'store']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/publicaciones', [PublicacionController::class, 'index']); // Obtener todas las publicaciones

// Rutas protegidas para usuarios autenticados


    Route::middleware('auth.jwt')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/publicaciones', [PublicacionController::class, 'store']); // Crear publicación
    Route::get('/publicaciones/{id}', [PublicacionController::class, 'show']); 
    Route::post('/logout', [AuthController::class, 'logout']);
});


// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('roles', RoleController::class);
});
