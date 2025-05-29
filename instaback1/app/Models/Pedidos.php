<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'total',
        'estado',
        'fecha_pedido',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }
}
