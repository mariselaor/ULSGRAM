<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index()
    {
        return response()->json(Pago::with(['pedido', 'metodoPago'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'metodo_pago_id' => 'nullable|exists:metodos_pago,id',
            'monto' => 'required|numeric|min:0',
            'estado' => 'required|in:pendiente,pagado,fallido',
            'fecha_pago' => 'nullable|date',
        ]);

        $pago = Pago::create($validated);

        return response()->json([
            'message' => 'Pago registrado exitosamente',
            'data' => $pago
        ], 201);
    }

    public function show($id)
    {
        $pago = Pago::with(['pedido', 'metodoPago'])->find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        return response()->json($pago);
    }

    public function update(Request $request, $id)
    {
        $pago = Pago::find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        $validated = $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'metodo_pago_id' => 'nullable|exists:metodos_pago,id',
            'monto' => 'required|numeric|min:0',
            'estado' => 'required|in:pendiente,pagado,fallido',
            'fecha_pago' => 'nullable|date',
        ]);

        $pago->update($validated);

        return response()->json([
            'message' => 'Pago actualizado correctamente',
            'data' => $pago
        ]);
    }

    public function destroy($id)
    {
        $pago = Pago::find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        $pago->delete();

        return response()->json(['message' => 'Pago eliminado correctamente']);
    }
}
