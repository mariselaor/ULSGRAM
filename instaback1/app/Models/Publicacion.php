<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    protected $fillable = ['url', 'titulo', 'descripcion'];
}
