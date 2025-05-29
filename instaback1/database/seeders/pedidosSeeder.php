<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class pedidosSeeder extends Seeder
{
    public function run()
    {
        DB::table('pedidos')->insert([
            ['usuario_id' => 1, 'total' => 319.98, 'estado' => 'pendiente', 'fecha_pedido' => now()],
        ]);
    }
}