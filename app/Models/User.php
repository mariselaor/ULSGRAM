<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Relación de Usuarios a Post (Un usuario puede tener muchos Posts)
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    //Relación entre el Usuario y los Likes (Un usuario puede tener multibles likes)
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    //Creamos un método que almacena los seguidores de un usuario (Fuera de las convenciones de laravel - por la migración)
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id');
    }

    //Creamos un método que almacena los usuarios que seguimos
    public function followings()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id');
    }

    //Comprobar si un usario ya sigue a otro
    public function siguiendo(User $user)
    {
        return $this->followers->contains($user->id);
    }

    

}
