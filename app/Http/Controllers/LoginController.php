<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    //Retornamos la vista del formulario de login
    public function index()
    {
        return view('auh.login');
    }

    //
    public function store(Request $request)
    {
        //Validadicón de usuario con laravel
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'

        ]);

        //Que pasa si el usuario no recuerda sus credencia o estan malas
        if(!auth()->attempt($request->only('email', 'password'), $request->remember)){
            return back()->with('mensaje', 'Credenciales Incorrectas');
        }

        //En caso de que los datos del usuario esten correctos
        return redirect()->route('post.index', auth()->user()->username);
    }
}
