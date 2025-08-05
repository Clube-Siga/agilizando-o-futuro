<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
   /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'cpf' => $this->generateCpf(), // Gera um CPF único para evitar conflitos
            'date_of_birth' => $this->faker->date('Y-m-d', '2004-12-31'), // Data de nascimento com idade mínima de 18 anos
            'mobile' => $this->faker->unique()->phoneNumber(),
            'is_low_income' => $this->faker->boolean(),
            'terms_accepted' => true, // Supondo que todos os usuários aceitam os termos por padrão
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Gera um CPF único para evitar conflitos.
     */
    private function generateCpf(): string
    {
        $cpf = $this->faker->unique()->numerify('###########');
        return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $cpf);
    }

    public function withRole(string $roleName): static
    {
        return $this->afterCreating(function (User $user) use ($roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $user->assignRole($role);
        });
    }
}
