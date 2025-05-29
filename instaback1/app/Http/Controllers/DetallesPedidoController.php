<?php

namespace App\Http\Controllers;

use App\Models\DetallesPedido;
use Illuminate\Http\Request;

class DetallesPedidoController extends Controller
{
    public function index()
    {
        return response()->json(DetallesPedido::with(['pedido', 'producto'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
            'precio_unitario' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $detalle = DetallesPedido::create($validated);

        return response()->json([
            'message' => 'Detalle del pedido creado exitosamente',
            'data' => $detalle
        ], 201);
    }

    public function show($id)
    {
        $detalle = DetallesPedido::with(['pedido', 'producto'])->find($id);

        if (!$detalle) {
            return response()->json(['message' => 'Detalle no encontrado'], 404);
        }

        return response()->json($detalle);
    }

    public function update(Request $request, $id)
    {
        $detalle = DetallesPedido::find($id);

        if (!$detalle) {
            return response()->json(['message' => 'Detalle no encontrado'], 404);
        }

        $validated = $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
            'precio_unitario' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $detalle->update($validated);

        return response()->json([
            'message' => 'Detalle actualizado correctamente',
            'data' => $detalle
        ]);
    }

    public function destroy($id)
    {
        $detalle = DetallesPedido::find($id);

        if (!$detalle) {
            return response()->json(['message' => 'Detalle no encontrado'], 404);
        }

        $detalle->delete();

        return response()->json(['message' => 'Detalle eliminado correctamente']);
    }
}

