<?php
use App\Http\Controllers\PublicacionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/publicacion/{id}/like', [PublicacionController::class, 'like'])->middleware('auth');
Route::post('/publicacion/{id}/comentar', [PublicacionController::class, 'comentar'])->middleware('auth');