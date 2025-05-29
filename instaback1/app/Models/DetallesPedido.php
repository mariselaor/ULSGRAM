<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallesPedido extends Model
{
    use HasFactory;

    protected $table = 'detalles_pedido'; // nombre correcto de la tabla

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
        'subtotal',
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedidos::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}