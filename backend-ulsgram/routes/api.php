<?php
use App\Http\Controllers\AuthController;
use Illuminate\Routing\Route;

Route::post('/login', [AuthController::class, 'login']);
