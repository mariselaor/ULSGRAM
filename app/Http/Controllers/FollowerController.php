<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    //Creamos el método para almacernar los seguidores
    public function store(User $user)
    {
        $user->followers()->attach( auth()->user()->id );
        
        return back();
    }

    //Creamos el método para dejar de seguir a los usuarios
    public function destroy(User $user)
    {
        $user->followers()->detach( auth()->user()->id );
        
        return back();
    }
}
