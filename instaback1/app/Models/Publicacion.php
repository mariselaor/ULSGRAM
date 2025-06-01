<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use HasFactory;

    // Especifica el nombre correcto de la tabla
    protected $table = 'publicaciones';

    protected $fillable = ['url', 'titulo', 'descripcion'];

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}