<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $usuarios = User::where('name', 'LIKE', "%{$search}%")->get();
        } else {
            $usuarios = User::all();
        }

        return response()->json($usuarios);
    }
}
