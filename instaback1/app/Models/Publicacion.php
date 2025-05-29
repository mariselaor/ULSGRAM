<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Publicacion extends Model
{
    protected $table = 'publicaciones';  // Aquí el nombre correcto de tu tabla

    protected $fillable = ['url', 'titulo', 'descripcion'];
}
