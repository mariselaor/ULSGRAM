<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('publicacion_id')->constrained(
                table: 'publicaciones', // Especifica el nombre correcto de la tabla
                indexName: 'likes_publicacion_id_foreign'
            )->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['user_id', 'publicacion_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('likes');
    }
};