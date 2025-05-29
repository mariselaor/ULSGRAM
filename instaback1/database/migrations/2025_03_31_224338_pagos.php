<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('pedidos')->onDelete('cascade');
            $table->foreignId('metodo_pago_id')->nullable()->constrained('metodos_pago')->onDelete('set null');
            $table->decimal('monto', 10, 2);
            $table->enum('estado', ['pendiente', 'pagado', 'fallido'])->default('pendiente');
            $table->timestamp('fecha_pago')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};