# Sprint 19: Desenvolvimento de Dashboards por Papel de Usuário

## Objetivo da Sprint

Nesta Sprint, você aprenderá a desenvolver interfaces de usuário (dashboards) personalizadas para diferentes papéis de usuário (`Admin`, `Student`, `Teacher`) em uma aplicação Laravel. O foco será em como o `DashboardController` pode orquestrar o redirecionamento e a exibição de conteúdo condicional com base nos papéis e permissões do usuário, proporcionando uma experiência de usuário adaptada.

## Conceitos Chave

-   **Dashboards Personalizadas:** Interfaces de usuário que exibem informações e funcionalidades específicas para um determinado tipo de usuário ou papel.
-   **Controle de Acesso Baseado em Papéis (RBAC):** Utilização dos papéis (`Admin`, `Student`, `Teacher`) definidos na Sprint 18 para determinar qual dashboard um usuário deve acessar.
-   **`DashboardController`:** O controlador responsável por direcionar os usuários para a dashboard correta com base em seu papel.
-   **Views Condicionais:** Utilização de diretivas Blade (`@role`, `@hasrole`, `@can`) ou lógica no frontend (Inertia.js) para exibir ou ocultar elementos da interface com base nas permissões do usuário.

## A Jornada da Implementação (Passo a Passo)

### Passo 1: Revisando o `DashboardController`

O `DashboardController` é o ponto central para o redirecionamento de dashboards. Ele deve verificar o papel do usuário logado e renderizar a view apropriada.

**Código Sugerido (`src/app/Http/Controllers/DashboardController.php`):**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Exibe a dashboard apropriada com base no papel do usuário.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->hasRole('Admin')) {
            return Inertia::render('Dashboard/AdminDashboard', [
                'user' => $user,
                'stats' => [
                    'totalUsers' => \App\Models\User::count(),
                    'totalContacts' => \App\Models\Contact::count(),
                ],
            ]);
        } elseif ($user->hasRole('Student')) {
            return Inertia::render('Dashboard/StudentDashboard', [
                'user' => $user,
                'coursesEnrolled' => 5, // Exemplo de dado para aluno
            ]);
        } elseif ($user->hasRole('Teacher')) {
            return Inertia::render('Dashboard/TeacherDashboard', [
                'user' => $user,
                'classesTaught' => 3, // Exemplo de dado para professor
            ]);
        }

        // Dashboard padrão para usuários sem papel específico ou não logados
        return Inertia::render('Dashboard/UserDashboard', [
            'user' => $user,
        ]);
    }
}
```

### Passo 2: Criando as Views/Componentes Inertia.js para Cada Dashboard

Para cada tipo de dashboard, criaremos um componente Inertia.js (ou uma view Blade, dependendo da sua preferência de frontend). Estes componentes receberão os dados passados pelo `DashboardController`.

**Código Sugerido (`src/resources/js/Pages/Dashboard/AdminDashboard.vue`):**

```vue
<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    user: Object,
    stats: Object,
});
</script>

<template>
    <Head title="Admin Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <p>Bem-vindo, Administrador {{ user.name }}!</p>
                        <p>Total de Usuários: {{ stats.totalUsers }}</p>
                        <p>Total de Contatos: {{ stats.totalContacts }}</p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
```

**Código Sugerido (`src/resources/js/Pages/Dashboard/StudentDashboard.vue`):**

```vue
<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    user: Object,
    coursesEnrolled: Number,
});
</script>

<template>
    <Head title="Student Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <p>Bem-vindo, Aluno {{ user.name }}!</p>
                        <p>Cursos Matriculados: {{ coursesEnrolled }}</p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
```

**Código Sugerido (`src/resources/js/Pages/Dashboard/TeacherDashboard.vue`):**

```vue
<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    user: Object,
    classesTaught: Number,
});
</script>

<template>
    <Head title="Teacher Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Teacher Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <p>Bem-vindo, Professor {{ user.name }}!</p>
                        <p>Turmas Lecionadas: {{ classesTaught }}</p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
```

### Passo 3: Definindo a Rota para o Dashboard

Certifique-se de que a rota `/dashboard` está apontando para o `DashboardController`.

**Código Sugerido (`src/routes/web.php`):**

```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    // ... outras rotas protegidas
});
```

### Passo 4: Testando o Redirecionamento e a Exibição da Dashboard

Crie testes de feature para verificar se os usuários são redirecionados para a dashboard correta e se o conteúdo é exibido adequadamente.

**Código Sugerido (`src/tests/Feature/DashboardAccessTest.php`):**

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DashboardAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Garante que os papéis existam para os testes
        Role::findOrCreate('Admin');
        Role::findOrCreate('Student');
        Role::findOrCreate('Teacher');
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Dashboard/AdminDashboard'));
    }

    public function test_student_can_access_student_dashboard(): void
    {
        $student = User::factory()->create();
        $student->assignRole('Student');

        $response = $this->actingAs($student)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Dashboard/StudentDashboard'));
    }

    public function test_teacher_can_access_teacher_dashboard(): void
    {
        $teacher = User::factory()->create();
        $teacher->assignRole('Teacher');

        $response = $this->actingAs($teacher)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Dashboard/TeacherDashboard'));
    }

    public function test_unassigned_user_gets_default_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Dashboard/UserDashboard'));
    }
}
```

## Próximo Passo e Verificação

1.  **Atualize o `DashboardController`:** Salve o conteúdo sugerido em `src/app/Http/Controllers/DashboardController.php`.
2.  **Crie os Componentes Inertia.js:** Salve os conteúdos sugeridos em `src/resources/js/Pages/Dashboard/AdminDashboard.vue`, `src/resources/js/Pages/Dashboard/StudentDashboard.vue` e `src/resources/js/Pages/Dashboard/TeacherDashboard.vue`.
3.  **Verifique a Rota:** Certifique-se de que a rota `/dashboard` em `src/routes/web.php` aponta para o `DashboardController`.
4.  **Crie os Testes:** Salve o conteúdo sugerido em `src/tests/Feature/DashboardAccessTest.php`.
5.  **Execute os Testes:**
    ```bash
    cd src && php artisan test --filter=DashboardAccessTest
    ```
    Verifique se os testes passam.
6.  **Teste Manualmente:** Crie usuários com diferentes papéis (Admin, Student, Teacher) e faça login para verificar se são redirecionados para a dashboard correta e se o conteúdo é exibido como esperado.

Parabéns! Você implementou dashboards personalizadas por papel de usuário, aprimorando a experiência e a segurança da sua aplicação.