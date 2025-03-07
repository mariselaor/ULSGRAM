<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImagenController extends Controller
{
    public function store(Request $request)
    {
        // Verificar si el archivo es válido
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $imagen = $request->file('file');

            // Generar un nombre único para la imagen
            $nombreImagen = Str::uuid() . "." . $imagen->extension();

            // Manejo de la imagen con Intervention Image
            $imagenServidor = Image::make($imagen);
            $imagenServidor->fit(1000, 1000);

            // Guardar la imagen en el disco público de Laravel
            $path = Storage::disk('public')->put('images/' . $nombreImagen, $imagenServidor->stream());

            // Devolver el nombre de la imagen en formato JSON
            return response()->json(['imagen' => $nombreImagen]);
        }

        return response()->json(['error' => 'No image uploaded or invalid'], 400);
    }
}

