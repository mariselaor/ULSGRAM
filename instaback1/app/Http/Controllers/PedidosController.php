<?php

namespace App\Http\Controllers;
use App\Models\Pedidos;
use Illuminate\Http\Request;

class PedidosController extends Controller
{
    public function index()
    {
        return response()->json(Pedidos::with('usuario')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'total' => 'required|numeric|min:0',
            'estado' => 'required|in:pendiente,enviado,entregado,cancelado',
            'fecha_pedido' => 'nullable|date',
        ]);

        $pedido = Pedidos::create($validated);

        return response()->json([
            'message' => 'Pedido creado exitosamente',
            'data' => $pedido
        ], 201);
    }

    public function show($id)
    {
        $pedido = Pedidos::with('usuario')->find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        return response()->json($pedido);
    }

    public function update(Request $request, $id)
    {
        $pedido = Pedidos::find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        $validated = $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'total' => 'required|numeric|min:0',
            'estado' => 'required|in:pendiente,enviado,entregado,cancelado',
            'fecha_pedido' => 'nullable|date',
        ]);

        $pedido->update($validated);

        return response()->json([
            'message' => 'Pedido actualizado correctamente',
            'data' => $pedido
        ]);
    }

    public function destroy($id)
    {
        $pedido = Pedidos::find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        $pedido->delete();

        return response()->json(['message' => 'Pedido eliminado correctamente']);
    }
}
