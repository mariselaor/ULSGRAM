<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'metodo_pago_id',
        'monto',
        'estado',
        'fecha_pago',
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedidos::class);
    }

    public function metodoPago()
    {
        return $this->belongsTo(MetodoPago::class);
    }
}
