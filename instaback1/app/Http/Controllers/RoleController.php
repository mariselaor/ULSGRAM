<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{
    public function index()
    {
        $roles = \Spatie\Permission\Models\Role::all()->pluck('name');
        return response()->json($roles);
    }

    public function store(RoleRequest $request)
    {
        $role = Role::create($request->validated());
        return response()->json($role, 201);
    }

    public function show(Role $role)
    {
        return response()->json($role);
    }

    public function update(RoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        return response()->json($role);
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted']);
    }
}
