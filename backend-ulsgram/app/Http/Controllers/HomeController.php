<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum'); // Usa sanctum si estás usando tokens con React
    }

    public function __invoke(Request $request)
    {
        // Obtener los usuarios que el usuario autenticado sigue
        $ids = auth()->user()->followings->pluck('id')->toArray();

        // Obtener los posts de esos usuarios con paginación
        $posts = Post::whereIn('user_id', $ids)
                    ->latest()
                    ->paginate(10); // Puedes cambiar la cantidad

        return response()->json($posts, 200);
    }
}
