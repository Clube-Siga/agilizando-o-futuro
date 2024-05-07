<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('subject');
            $table->string('formMessage', 500);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }

    //  /**
    //  * Run alteracao the migrations.
    //  */
    // public function up(): void
    // {
    //     Schema::table('contacts', function (Blueprint $table) {
    //         // Adicionar o campo `approved` do tipo boolean (opcional)
    //         $table->boolean('approved')->default(false)->nullable();

    //         // Adicionar o campo `user_id` do tipo unsignedBigInteger (opcional)
    //         $table->unsignedBigInteger('user_id')->nullable();

    //         // Adicionar a restrição de chave estrangeira para o campo `user_id` (opcional)
    //         if ($table->hasColumn('user_id')) {
    //             $table->foreign('user_id')->references('id')->on('users');
    //         }

    //         // Adicionar o campo `ip_address` do tipo ipAddress (obrigatório)
    //         $table->ipAddress('ip_address')->nullable();
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  */
    // public function down(): void
    // {
    //     Schema::table('contacts', function (Blueprint $table) {
    //         $table->dropColumn('approved'); // Remover campo `approved` (opcional)
    //         $table->dropColumn('user_id'); // Remover campo `user_id` (opcional)
    //         $table->dropForeign('contacts_user_id_foreign'); // Remover restrição de chave estrangeira (opcional)
    //         $table->dropColumn('ip_address'); // Remover campo `ip_address`
    //     });
    // }
};
