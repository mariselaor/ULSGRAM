<?php

use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return response()->json([
        'message' => 'Usa el método POST para iniciar sesión.'
    ]);
});

Route::get('/test', function () {
    return response()->json(['message' => 'Frontend conectado']);
});
