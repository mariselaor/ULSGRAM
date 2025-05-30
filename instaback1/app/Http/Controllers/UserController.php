<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // Método para listar usuarios con búsqueda opcional
    public function index(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $usuarios = User::where('name', 'LIKE', "%{$search}%")->get();
        } else {
            $usuarios = User::all();
        }

        return response()->json($usuarios);
    }

    // Nuevo método para obtener los usuarios más recientes
    public function recent()
    {
        // Obtiene los 10 usuarios más recientes, ordenados por fecha de creación
        $recentUsers = User::latest()->take(10)->get();

        return response()->json($recentUsers);
    }
}
