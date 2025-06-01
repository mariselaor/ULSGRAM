<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return view('dashboard.index', compact('users'));
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('dashboard.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->only('name', 'email'));

        return redirect()->route('dashboard')->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('dashboard')->with('success', 'Usuario eliminado.');
    }

    public function toggleBlock($id)
    {
        $user = User::findOrFail($id);
        $user->is_blocked = !$user->is_blocked;
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Estado de bloqueo actualizado.');
    }
}
