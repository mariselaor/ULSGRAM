<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\DetallesPedidoController;
use App\Http\Controllers\UserController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/publicaciones', [PublicacionController::class, 'index']); // Obtener todas las publicaciones

// Rutas protegidas para usuarios autenticados
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/publicaciones', [PublicacionController::class, 'store']); // Crear publicación
    Route::get('/publicaciones/{id}', [PublicacionController::class, 'show']); // Obtener una publicación específica
});

// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('roles', RoleController::class);
    Route::resource('metodos-pago', MetodoPagoController::class);
    Route::resource('pagos', PagoController::class);
    Route::resource('categorias', CategoriaController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('pedidos', PedidosController::class);
    Route::resource('detalles-pedido', DetallesPedidoController::class);
});
