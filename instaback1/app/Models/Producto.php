<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'categoria_id',
        'imagen_url',
    ];

    // Relación: Un producto pertenece a una categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}