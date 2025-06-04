<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    public function store(Request $request, User $user, Post $post)
    {
        // Validar los datos
        $request->validate([
            'comentario' => 'required|max:255'
        ]);

        // Almacenar el comentario
        $comentario = Comentario::create([
            'user_id' => auth()->id(),
            'post_id' => $post->id,
            'comentario' => $request->comentario
        ]);

        // Retornar respuesta JSON
        return response()->json([
            'message' => 'Comentario realizado correctamente',
            'comentario' => $comentario
        ], 201); // 201: creado
    }
}
