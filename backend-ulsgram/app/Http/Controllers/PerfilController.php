<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class PerfilController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // En API, este método puede devolver los datos del perfil autenticado
    public function index(Request $request)
    {
        $user = $request->user(); // Usuario autenticado

        return response()->json([
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        // Normalizar username a slug
        $request->merge(['username' => Str::slug($request->username)]);

        // Validar datos
        $request->validate([
            'username' => ['required', 'unique:users,username,' . $request->user()->id, 'min:3', 'max:20', 'not_in:twitter,editar-perfil'],
            'imagen' => ['nullable', 'image', 'max:2048'] // valida que sea imagen si viene
        ]);

        $nombreImagen = null;

        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');

            $nombreImagen = Str::uuid() . '.' . $imagen->extension();

            $imagenServidor = Image::make($imagen);
            $imagenServidor->fit(1000, 1000);

            $imagenPath = public_path('perfiles') . '/' . $nombreImagen;
            $imagenServidor->save($imagenPath);
        }

        $usuario = User::find($request->user()->id);
        $usuario->username = $request->username;
        $usuario->imagen = $nombreImagen ?? $usuario->imagen ?? null;
        $usuario->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $usuario,
        ]);
    }
}
