<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens; // Si usas Sanctum
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'imagen',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    // Relaciones, mutators, etc.

}
