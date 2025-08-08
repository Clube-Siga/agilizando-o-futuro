<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'cpf' => '849.314.730-32',
            'date_of_birth' => '2000-01-01',
            'mobile' => '(11) 99999-9999',
            'terms' => true,
            'userType' => 'Student',
        ]);

        $response->assertSessionHasNoErrors(); // Adicionado para verificar erros de validação

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user); // Ensure user is created

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
