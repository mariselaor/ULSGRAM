<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Aquí pones la lógica de login, o para probar:
         return response()->json(['success' => true]);
    }
}
