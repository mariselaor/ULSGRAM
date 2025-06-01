<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    public function index($publicacionId)
    {
        try {
            $comentarios = Comentario::where('publicacion_id', $publicacionId)
                ->with('user:id,name') // Solo cargar campos existentes
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $comentarios
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener comentarios',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request, $publicacionId)
    {
        try {
            $request->validate([
                'contenido' => 'required|string|max:1000',
            ]);

            $comentario = Comentario::create([
                'user_id' => Auth::id(),
                'publicacion_id' => $publicacionId,
                'contenido' => $request->contenido,
            ]);

            // Cargar información básica del usuario
            $comentario->load('user:id,name');

            return response()->json([
                'success' => true,
                'message' => 'Comentario creado correctamente',
                'data' => $comentario
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al guardar el comentario',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}