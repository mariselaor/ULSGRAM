<?php

use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Ruta de la vista principal
Route::get('/', HomeController::class)->name('home');

Route::get('/register', [RegisterController::class,'index'])->name('register');
Route::post('/register', [RegisterController::class,'store']);

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store']);

Route::post('/logout', [LogoutController::class, 'store'])->name('logout');

//Rutas para el perfil
Route::get('/editar-perfil', [PerfilController::class, 'index'])->name('perfil.index');
Route::post('/editar-perfil', [PerfilController::class, 'store'])->name('perfil.store');


//Creamo la ruta donde crearemos los Posts
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
//Pasomos la ruta para la función store
Route::post('posts', [PostController::class, 'store'])->name('posts.store');
//Para llamar la vista del post de manera individual
Route::get('/{user:username}/posts/{post}', [PostController::class, 'show'])->name('posts.show');

//Para poder agregar los comentarios
Route::post('/{user:username}/posts/{post}', [ComentarioController::class, 'store'])->name('comentarios.store');

//Para poder eliminar los Posts
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');


//Rutas para guardar las images desde el controlador
Route::post('/imagenes', [ImagenController::class, 'store'])->name('imagenes.store');

//Likes a las fotos
Route::post('/posts/{post}/likes', [LikeController::class, 'store'])->name('posts.likes.store');

//Quitar Likes a las fotos
Route::delete('/posts/{post}/likes', [LikeController::class, 'destroy'])->name('posts.likes.destroy');

//Modificamos la ruta para agregar el nombre del usuario a la url
Route::get('/{user:username}', [PostController::class, 'index'])->name('post.index');

//Siguiendo usuarios
Route::post('/{user:username}/follow', [FollowerController::class, 'store'])->name('users.follow');
//Dejar de seguir usuarios
Route::delete('/{user:username}/unfollow', [FollowerController::class, 'destroy'])->name('users.unfollow');

