<?php
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\PerfilController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; // o el controlador que uses

Route::post('/login', [AuthController::class, 'login']);
Route::get('/posts', [PostController::class, 'index']);

// Mensaje para GET /login indicando que no está permitido
Route::post('/login', function () {
    return response()->json(['message' => 'Método GET no permitido, usa POST.'], 405);
});

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', [PostController::class, 'index']);
    Route::post('/perfil', [PerfilController::class, 'store']);
});
