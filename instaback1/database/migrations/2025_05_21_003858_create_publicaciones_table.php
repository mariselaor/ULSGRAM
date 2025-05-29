<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('publicaciones', function (Blueprint $table) {
        $table->id();
        $table->string('url');         // para la ruta de la imagen
        $table->string('titulo');      // título de la publicación
        $table->text('descripcion');   // descripción de la publicación
        $table->timestamps();          // created_at y updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publicaciones');
    }
};
