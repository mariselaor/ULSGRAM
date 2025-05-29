<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use Illuminate\Http\Request;

class MetodoPagoController extends Controller
{
    public function index()
    {
        return response()->json(MetodoPago::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:metodos_pago,nombre',
            'descripcion' => 'nullable|string',
        ]);

        $metodo = MetodoPago::create($validated);

        return response()->json([
            'message' => 'pago creado exitosamente',
            'data' => $metodo
        ], 201);
    }

    public function show($id)
    {
        $metodo = MetodoPago::find($id);

        if (!$metodo) {
            return response()->json(['message' => 'Método de pago no encontrado'], 404);
        }

        return response()->json($metodo);
    }

    public function update(Request $request, $id)
    {
        $metodo = MetodoPago::find($id);

        if (!$metodo) {
            return response()->json(['message' => 'Método de pago no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:metodos_pago,nombre,' . $id,
            'descripcion' => 'nullable|string',
        ]);

        $metodo->update($validated);

        return response()->json($metodo);
    }

    public function destroy($id)
    {
        $metodo = MetodoPago::find($id);

        if (!$metodo) {
            return response()->json(['message' => 'Método de pago no encontrado'], 404);
        }

        $metodo->delete();

        return response()->json(['message' => 'Método de pago eliminado correctamente']);
    }
}
