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

Route::get('/usuarios', [UserController::class, 'index']);

// Rutas públicas para registro, login y publicaciones
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas para publicaciones (GET sin middleware para mostrar, POST protegido para crear)
Route::get('/publicaciones', [PublicacionController::class, 'index']);
// Ruta para obtener perfil del usuario autenticado
Route::middleware('auth:sanctum')->get('/user-profile', [AuthController::class, 'userProfile']);

// Ruta para obtener todas las publicaciones
Route::middleware('auth:sanctum')->get('/publicaciones', [PublicacionController::class, 'index']);


// Rutas protegidas para administración, solo para usuarios con rol admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userProfile']);

    Route::resource('roles', RoleController::class);
    Route::resource('metodos-pago', MetodoPagoController::class);
    Route::resource('pagos', PagoController::class);
    Route::resource('categorias', CategoriaController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('pedidos', PedidosController::class);
    Route::resource('detalles-pedido', DetallesPedidoController::class);
});
