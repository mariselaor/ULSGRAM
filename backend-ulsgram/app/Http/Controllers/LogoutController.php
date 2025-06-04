<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function store(Request $request)
    {
        auth()->logout();

        // Si usas tokens (Sanctum, Passport), aquí también podrías revocar tokens

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}
