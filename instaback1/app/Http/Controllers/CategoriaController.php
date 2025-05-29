<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        return response()->json(Categoria::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100|unique:categorias,nombre',
            'descripcion' => 'nullable|string',
        ]);

        $categoria = Categoria::create($validated);

        return response()->json($categoria, 201);
    }

    public function show($id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        return response()->json($categoria, 200);
    }

    public function update(Request $request, $id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:100|unique:categorias,nombre,' . $id,
            'descripcion' => 'nullable|string',
        ]);

        $categoria->update($validated);

        return response()->json($categoria, 200);
    }

    public function destroy($id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $categoria->delete();

        return response()->json(['message' => 'Categoría eliminada correctamente'], 200);
    }
}
