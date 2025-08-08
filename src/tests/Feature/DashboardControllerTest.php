<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use Database\Seeders\DatabaseSeeder;


class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }
    /**
     * Testa o redirecionamento do admin para o dashboard correto.
     *
     * @return void
     */
    public function testAdminRedirectToDashboard()
    {
        // Cria um usuário com a função Admin
        $admin = User::factory()->withRole('Admin')->create();

        // Autentica o usuário
        $response = $this->actingAs($admin)->get('/dashboard');

        // Verifica se a resposta está correta
        $response->assertStatus(200);

        // verifica se o componente foi renderizado corretamente
        $response->assertInertia(fn (Assert $page) => $page->component('Dashboard/DashAdmin'));
    }

    /**
     * Testa o redirecionamento do estudante para o dashboard correto.
     *
     * @return void
     */
    public function testStudentRedirectToDashboard()
    {
        // Cria um usuário com a função 'Student'
        $student = User::factory()->withRole('Student')->create();
        $student->assignRole('Student');

        // Faz a requisição ao controller
        $response = $this->actingAs($student)->get('/dashboard');

        // Verifica se a resposta está correta
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Dashboard/DashStudent'));
    }

    /**
     * Testa o redirecionamento do professor para o dashboard correto.
     *
     * @return void
     */
    public function testTeacherRedirectToDashboard()
    {
        // Cria um usuário com a função 'Teacher'
        $teacher = User::factory()->withRole('Teacher')->create();
        $teacher->assignRole('Teacher');

        // Faz a requisição ao controller
        $response = $this->actingAs($teacher)->get('/dashboard');

        // Verifica se a resposta está correta
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Dashboard/DashTeacher'));
    }

    /**
     * Testa o acesso negado para usuários sem função definida.
     *
     * @return void
     */
    public function testAccessDeniedForUndefinedRole()
    {
        // Cria um usuário sem função
        $user = User::factory()->create();

        // Faz a requisição ao controller
        $response = $this->actingAs($user)->get('/dashboard');

        // Verifica se o acesso é negado
        $response->assertStatus(403);
    }
}
