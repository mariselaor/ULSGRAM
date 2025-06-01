<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Publicacion;

class Comentario extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'publicacion_id', 'contenido'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }
}
