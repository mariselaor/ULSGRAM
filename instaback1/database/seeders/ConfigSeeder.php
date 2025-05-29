<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\password;

class ConfigSeeder extends Seeder
{
/**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear o buscar el rol "admin"
        $role = Role::firstOrCreate([
            "name" => 'admin'
        ]);

        // Crear o buscar el permiso "crear"
        $permiso = Permission::firstOrCreate([
            "name" => 'crear'
        ]);

        // Asignar el permiso al rol (si no se ha asignado aún)
        if (!$role->hasPermissionTo($permiso)) {
            $role->givePermissionTo($permiso);
        }

        // Crear usuario 
        $rene = User::firstOrCreate(
            ["email" => "rene@gmail.com"],
            [
                "name" => "rene",
                "password" => Hash::make('12345678')
            ]
        );

        // Asignar el rol al usuario  (si aún no lo tiene)
        if (!$rene->hasRole($role)) {
            $rene->assignRole($role->name);
        }

        // Crear usuario Mario
        $mario = User::firstOrCreate(
            ["email" => "mario@example.com"],
            [
                "name" => "mario",
                "password" => Hash::make('password1234')
            ]
        );

        // Asignar el rol al usuario Mario (si aún no lo tiene)
        if (!$mario->hasRole($role)) {
            $mario->assignRole($role->name);
        }
    }
}