<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'imagen',
        'user_id'
    ];

    //Relación de Post a Usuarios (Un Post pertenece a un Usuario)
    public function user()
    {
        return $this->belongsTo(User::class)->select(['name', 'username']);
    }

    //Relación de Post a Comentarios
    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    //Relación de Post a Likes
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    //Creamos un método para verificar si un usuario ya dio like
    public function checkLike(User $user)
    {
        return $this->likes->contains('user_id', $user->id);
    }

}
