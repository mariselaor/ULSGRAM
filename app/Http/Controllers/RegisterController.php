<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    //Creamos la función para que me mande la vista
    public function index() 
    {
        return view('auh/register');
    }

    //Creamos la función para va capturar los datos por el metodo POST
    public function store(Request $request)
    {
        //dd('Post...'); "Esto sirve para probar si el formulario esta mandado al controlador y imprime Post.. "
        //dd($request->get('username'));

        //Modificar el Request
        $request->request->add(['username' => Str::slug($request->username)]);

        //Validadicón con laravel
        $this->validate($request, [
            'name' => 'required|max:30',
            'username' => 'required|unique:users|min:3|max:20',
            'email' => 'required|unique:users|email|max:60',
            'password' => 'required|confirmed|min:6'

        ]);

        //Crear y guardar los datos del usuario
        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make ($request->password) 
            
        ]);

        //Autenticar el usuario
        auth()->attempt($request->only('email', 'password'));

        //Redireccionar al Usuario
        return redirect()->route('post.index' , auth()->user()->username);
    }

}