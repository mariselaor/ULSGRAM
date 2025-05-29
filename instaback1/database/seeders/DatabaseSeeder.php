<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ConfigSeeder::class,
            categoriasSeeder::class,
            metodospagoSeeder::class,
            productosSeeder::class,
            pedidosSeeder::class,
            pagosSeeder::class,
            detallespedidoSeeder::class
        ]);
    }
}
