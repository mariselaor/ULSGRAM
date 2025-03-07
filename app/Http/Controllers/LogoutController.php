<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    //
    public function store()
    {
        //dd('Cerrar Sesión');

        //Cerramos la Sesión con un auth y el método logout
        auth()->logout();

        //Redireccionamos a Login
        return redirect('login');
    }
}
