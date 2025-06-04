<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    // Para API no hace falta método index para vista
    // public function index() {}

    public function store(Request $request)
    {
        // Normalizar username a slug
        $request->merge(['username' => Str::slug($request->username)]);

        // Validación
        $request->validate([
            'name' => 'required|max:30',
            'username' => 'required|unique:users|min:3|max:20',
            'email' => 'required|unique:users|email|max:60',
            'password' => 'required|confirmed|min:6'
        ]);

        // Crear usuario
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Autenticar usuario
        auth()->login($user);

        // Retornar respuesta JSON con datos del usuario autenticado
        return response()->json([
            'message' => 'Usuario registrado y autenticado correctamente',
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken // si usas Sanctum o Passport para auth API
        ]);
    }
}
