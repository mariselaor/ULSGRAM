<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComentariosTable extends Migration
{
    public function up()
    {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->text('contenido');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('publicacion_id')->constrained('publicaciones')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['publicacion_id', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('comentarios');
    }
}