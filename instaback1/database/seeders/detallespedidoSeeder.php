<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class detallespedidoSeeder extends Seeder
{
    public function run()
    {
        DB::table('detalles_pedido')->insert([
            ['pedido_id' => 1, 'producto_id' => 1, 'cantidad' => 1, 'precio_unitario' => 299.99, 'subtotal' => 299.99],
            ['pedido_id' => 1, 'producto_id' => 2, 'cantidad' => 1, 'precio_unitario' => 19.99, 'subtotal' => 19.99],
        ]);
    }
}
