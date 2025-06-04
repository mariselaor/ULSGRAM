<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    // Método para seguir a un usuario
    public function store(User $user)
    {
        $user->followers()->attach(auth()->id());

        return response()->json([
            'message' => 'Has comenzado a seguir al usuario.',
            'user_id' => $user->id
        ], 200);
    }

    // Método para dejar de seguir a un usuario
    public function destroy(User $user)
    {
        $user->followers()->detach(auth()->id());

        return response()->json([
            'message' => 'Has dejado de seguir al usuario.',
            'user_id' => $user->id
        ], 200);
    }
}
