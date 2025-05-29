<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        // Verificar si el usuario tiene permisos
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validar la solicitud
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Guardar el archivo
        $path = $request->file('file')->store('uploads', 'public');

        return response()->json(['message' => 'File uploaded successfully', 'path' => $path], 200);
    }
}
