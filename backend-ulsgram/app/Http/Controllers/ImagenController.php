<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ImagenController extends Controller
{
    public function store(Request $request)
    {
        // Validar que venga un archivo de imagen
        $request->validate([
            'file' => 'required|image|max:5120' // máximo 5MB
        ]);

        $imagen = $request->file('file');

        // Generar nombre único para la imagen
        $nombreImagen = Str::uuid() . '.' . $imagen->extension();

        // Procesar la imagen con Intervention Image
        $imagenServidor = Image::make($imagen);
        $imagenServidor->fit(1000, 1000);

        // Guardar la imagen en public/uploads
        $imagenPath = public_path('uploads') . '/' . $nombreImagen;
        $imagenServidor->save($imagenPath);

        // Retornar la respuesta JSON con el nombre de la imagen
        return response()->json([
            'imagen' => $nombreImagen,
            'url' => asset('uploads/' . $nombreImagen)
        ], 201);
    }
}
