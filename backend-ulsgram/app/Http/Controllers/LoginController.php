<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Intentar autenticación
        if (!Auth::attempt($request->only('email', 'password'), $request->remember)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $user = Auth::user();

        // Puedes generar un token aquí si usas Sanctum o Passport
        // Por ejemplo: $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
            // 'token' => $token, // si usas tokens
        ]);
    }

    public function logout(Request $request)
    {
        // Si usas tokens, revocar el token
        // $request->user()->currentAccessToken()->delete();

        Auth::logout();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}
