<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categoriasSeeder extends Seeder
{
    public function run()
    {
        DB::table('categorias')->insert([
            ['nombre' => 'Vestidos', 'descripcion' => 'Camisas', 'created_at' => now()],
            ['nombre' => 'Pantalon', 'descripcion' => 'Pantalones', 'created_at' => now()],
        ]);
    }
}
