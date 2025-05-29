<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class productosSeeder extends Seeder
{
    public function run()
    {
        DB::table('productos')->insert([
            [
                'nombre' => 'Prendas',
                'descripcion' => 'Vestido, Camisa, Pantalon.',
                'precio' => 299.99,
                'stock' => 10,
                'categoria_id' => 1,
                'imagen_url' => 'prendas.jpg',
                'created_at' => now(),
            ],
            [
                'nombre' => 'Camiseta',
                'descripcion' => 'Camiseta de algodón',
                'precio' => 19.99,
                'stock' => 50,
                'categoria_id' => 2,
                'imagen_url' => 'camiseta.jpg',
                'created_at' => now(),
            ],
        ]);
    }
}
