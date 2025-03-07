<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Backtrace\File;

class PostController extends Controller
{
    //Para proteger la cuenta
    //Creamos un constructor donde ejecutamos un middleware (Verificara que el usuario este autenticado antes de mostrar el index)
    public function __construct()
    {
        $this->middleware('auth')->except(['show', 'index']);
    }

    public function index(User $user)
    {
        //Creamos la consulta para traer los Posts al perfil --- paginate (un modo) --simplePaginate (otro modo)
        $posts = Post::where('user_id', $user->id)->latest()->simplePaginate(16);

        return view('dashboard', [
            'user'=>$user,
            //Es necesario pasar la vista
            'posts' => $posts
        ]);
    }

    public function create()
    {
        //dd('Creando Post');

        return view('posts.create');
    }

    public function store(Request $request)
    {
        //dd('Creando Publicación');
        $this->validate($request, [
            'titulo' => 'required|max:255',
            'descripcion' => 'required',
            'imagen' => 'required'
            //para que este funcione hay que ir a crear in div, en create.blade
        ]);

        //Luego de las pruebas de value

        //Creanos en Post que mandara la información a la base de datos
        //Post::create([
        //    'titulo' => $request->titulo,
        //    'descripcion' => $request->descripcion,
        //    'imagen' => $request->imagen,
            //tambien hay que pasarle el usuario
        //    'user_id' => auth()->user()->id
        //]);


        //Nueva forma de mandar los Post, una vez ya esten creadas las relaciones
        //Al estilo de laravel
        $request->user()->posts()->create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'imagen' => $request->imagen,
            'user_id' => auth()->user()->id
        ]);


        //Retornamos a su muro
        return redirect()->route('post.index', auth()->user()->username);
    }

    //Show, funciona para mostrar resultados de manera individual 
    public function show( User $user, Post $post)
    {
        return view('posts.show', [
            'post' => $post,
            'user' => $user
        ]);
    }

    //Creamos la función que nos permitira borrar los posts
    public function destroy (Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        //Eliminar la imagen 

        chmod(public_path('uploads'), 0777);
        $imagen_path = public_path('uploads/' . $post->imagen);
        
        if (file_exists($imagen_path)) {
            unlink($imagen_path);
        }
        
        //Dar permisos a la carpeta y Eliminar la imagen
        //chmod(public_path('uploads'), 0777);
        //$imagen_path = public_path('uploads/' . $post->imagen);
        //if(File::exists($imagen_path)) {
          //  unlink($imagen_path);
        //}

        return redirect()->route('post.index', auth()->user()->username);
    }

}
