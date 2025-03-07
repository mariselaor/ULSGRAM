<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //Verificar que el usuario este autenticado para poder ver la página principal
    public function __construct()
    {
        $this->middleware('auth');
    }

    //Creando el método para la vista principal
    public function __invoke()
    {
        //Obtener a los usuarios que seguimos
        $ids = auth()->user()->followings->pluck('id')->toArray();
        $posts = Post::whereIn('user_id', $ids)->latest()->paginate(20);

        return view('home', [
            'posts' => $posts
        ]);
    }
}
