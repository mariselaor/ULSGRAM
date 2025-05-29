<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class pagosSeeder extends Seeder
{
    public function run()
    {
        DB::table('pagos')->insert([
            ['pedido_id' => 1, 'metodo_pago_id' => 1, 'monto' => 319.98, 'estado' => 'pagado', 'fecha_pago' => now()],
        ]);
    }
}
