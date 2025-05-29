<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class metodospagoSeeder extends Seeder
{
    public function run()
    {
        DB::table('metodos_pago')->insert([
            ['nombre' => 'Tarjeta de crédito', 'descripcion' => 'Pago con tarjeta'],
            ['nombre' => 'PayPal', 'descripcion' => 'Pago con PayPal'],
        ]);
    }
}
