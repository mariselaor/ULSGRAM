<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class PerfilController extends Controller
{
    //Protegemos la ruta
    public function __construct()
    {
        $this->middleware('auth');
    }

    //Creamos el método para editar perfil
    public function index()
    {
        return view('perfil.index');
    }

    //
    public function store(Request $request)
    {
        //Modificar el Request
        $request->request->add(['username' => Str::slug($request->username)]);
        
        $this->validate($request, [
            'username' => ['required','unique:users,username,'.auth()->user()->id, 'min:3', 'max:20', 'not_in:twitter,editar-perfil']
        ]);

        if($request->imagen){
            //return "Desde imagen controller";
            $imagen = $request->file('imagen');

            //Manejo de la imagen con intervention/image
            $nombreImagen = Str::uuid() . "." . $imagen->extension();

            $imagenServidor = Image::make($imagen);
            $imagenServidor->fit(1000, 1000);

            $imagenPath = public_path('perfiles') . "/" . $nombreImagen;
            $imagenServidor->save($imagenPath);
        }

        //Guardar cambios
        $usuario = User::find(auth()->user()->id);
        $usuario->username = $request->username;
        $usuario->imagen = $nombreImagen ?? auth()->user()->imagen ?? null;
        $usuario->save();

        //Redireccionamos al usuario
        return redirect()->route('post.index', $usuario->username);
    }
}
