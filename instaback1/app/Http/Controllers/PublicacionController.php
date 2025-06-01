<?php
namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\Like;
use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublicacionController extends Controller
{
    // Listar todas las publicaciones
    public function index()
    {
        $publicaciones = Publicacion::with(['likes', 'comentarios.user'])->get();
        return response()->json($publicaciones);
    }

    // Guardar una publicación con imagen, título y descripción
    public function store(Request $request)
    {
        $request->validate([
            'imagen' => 'required|image|max:2048',
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
        ]);

        $path = $request->file('imagen')->store('imagenes', 'public');
        $url = asset('storage/' . $path);

        $publicacion = Publicacion::create([
            'url' => $url,
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json($publicacion, 201);
    }

    // Agregar un like a la publicación
    public function like($id)
    {
        $user = Auth::user();

        $publicacion = Publicacion::findOrFail($id);

        $existeLike = Like::where('user_id', $user->id)
                          ->where('publicacion_id', $publicacion->id)
                          ->first();

        if (!$existeLike) {
            Like::create([
                'user_id' => $user->id,
                'publicacion_id' => $publicacion->id,
            ]);
        }

        return response()->json(['message' => 'Like agregado'], 200);
    }

    // Agregar un comentario a la publicación
    public function comentar(Request $request, $id)
    {
        $request->validate([
            'comentario' => 'required|string|max:500',
        ]);

        $user = Auth::user();
        $publicacion = Publicacion::findOrFail($id);

        $comentario = Comentario::create([
            'user_id' => $user->id,
            'publicacion_id' => $publicacion->id,
            'comentario' => $request->comentario,
        ]);

        return response()->json($comentario, 201);
    }
}
