<?php
namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    public function index($publicacionId)
    {
        $comentarios = Comentario::where('publicacion_id', $publicacionId)
            ->with('user:id,name') // si quieres info del usuario
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comentarios);
    }

    public function store(Request $request, $publicacionId)
    {
        $request->validate([
            'contenido' => 'required|string|max:1000',
        ]);

        $comentario = Comentario::create([
            'user_id' => Auth::id(), // Asegúrate que el usuario esté autenticado
            'publicacion_id' => $publicacionId,
            'contenido' => $request->contenido,
        ]);

        return response()->json($comentario, 201);
    }
}
