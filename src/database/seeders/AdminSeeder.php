<?php

namespace Database\Seeders;
//importar as classe a serem usadas
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Webert Maximiano Ramos',
            'email' => 'webertcoach@gmail.com',
            'password' => Hash::make('12345678'),
            'cpf' => '08619657798',
            'date_of_birth' => '1981-01-11',
            'mobile' => '21981760591',
            'terms_accepted' => true,
        ]);

        // busca a funcao de acordo com o tipo do usuario
        $role = Role::where('name', 'Admin')->first();
        // se existir a funcao
        if ($role) {
            $user->assignRole($role); //atribuir ao usuario
        }
    }
}
