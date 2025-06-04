<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowersTable extends Migration
{
    public function up()
    {
        Schema::create('followers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');       // Usuario que sigue
            $table->foreignId('follower_id')->constrained('users')->onDelete('cascade'); // Usuario que es seguido
            $table->timestamps();

            $table->unique(['user_id', 'follower_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('followers');
    }
}

