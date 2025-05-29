<?php
namespace App\Http\Controllers;

use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PublicacionController extends Controller
{
    // Listar todas las publicaciones
    public function index()
    {
        $publicaciones = Publicacion::all();
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

}
