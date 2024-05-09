<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            
            $table->boolean('approved')->default(false)->nullable();
            
            $table->unsignedBigInteger('user_id')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
        
            $table->ipAddress('ip_address')->nullable();
        });

    }

   
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('approved');
            $table->dropColumn('user_id'); 
            $table->dropForeign('contacts_user_id_foreign'); 
            $table->dropColumn('ip_address'); 
        });
    }
};