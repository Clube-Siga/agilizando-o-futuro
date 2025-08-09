# Sprint 18: Controle de Acesso Baseado em Papéis (RBAC) com Spatie/laravel-permission

## Objetivo da Sprint

Nesta Sprint, você aprenderá a implementar um sistema robusto de Controle de Acesso Baseado em Papéis (RBAC) em sua aplicação Laravel utilizando o popular pacote `spatie/laravel-permission`. Isso permitirá gerenciar papéis e permissões de usuários de forma granular, controlando o acesso a funcionalidades, rotas e até mesmo elementos da interface do usuário.

## Conceitos Chave

-   **RBAC (Role-Based Access Control):** Um modelo de segurança onde as permissões de acesso a recursos são associadas a papéis, e os usuários recebem esses papéis. Em vez de atribuir permissões diretamente a usuários, você atribui papéis, o que simplifica o gerenciamento.
-   **Papel (Role):** Um conjunto de permissões. Exemplos: `admin`, `student`, `teacher`.
-   **Permissão (Permission):** Uma capacidade específica dentro da aplicação. Exemplos: `create post`, `edit user`, `view dashboard`.
-   **`spatie/laravel-permission`:** Um pacote Laravel que facilita a implementação de papéis e permissões, fornecendo traits, middlewares e métodos auxiliares para gerenciar e verificar o acesso.
-   **Middleware:** Uma camada de software que filtra requisições HTTP que entram na sua aplicação. No Laravel, middlewares podem ser usados para verificar permissões antes que uma rota seja acessada.

## A Jornada da Implementação (Passo a Passo)

O pacote `spatie/laravel-permission` já está integrado ao nosso projeto, conforme a análise técnica. Esta Sprint focará em como utilizá-lo.

### Passo 1: Entendendo a Configuração Inicial

O pacote já deve ter sido instalado e as migrações executadas. Você pode verificar a configuração em `config/permission.php`.

### Passo 2: Criando Papéis e Permissões (Seeders)

É uma boa prática criar papéis e permissões iniciais via seeders, garantindo que eles estejam disponíveis em novos ambientes ou após migrações.

No nosso projeto, já temos um `RoleSeeder.php` e um `AdminSeeder.php` que criam os papéis `Admin`, `Student`, `Teacher` e atribuem o papel `Admin` a um usuário inicial.

**Exemplo de `src/database/seeders/RoleSeeder.php`:**

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create permissions
        // Permission::create(['name' => 'edit articles']);
        // Permission::create(['name' => 'delete articles']);
        // Permission::create(['name' => 'publish articles']);
        // Permission::create(['name' => 'unpublish articles']);

        // Create roles and assign existing permissions
        $adminRole = Role::create(['name' => 'Admin']);
        // $adminRole->givePermissionTo('edit articles');

        $studentRole = Role::create(['name' => 'Student']);
        $teacherRole = Role::create(['name' => 'Teacher']);

        // Você pode adicionar permissões aqui conforme a necessidade
        // $studentRole->givePermissionTo('view student dashboard');
    }
}
```

### Passo 3: Atribuindo Papéis a Usuários

Para atribuir um papel a um usuário, você pode usar o método `assignRole()` no seu modelo `User` (que deve usar o trait `HasRoles`).

**Exemplo (`src/database/seeders/AdminSeeder.php`):**

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'cpf' => '123.456.789-00',
            'date_of_birth' => '1990-01-01',
        ]);

        $user->assignRole('Admin');
    }
}
```

### Passo 4: Protegendo Rotas com Middlewares

O pacote `spatie/laravel-permission` fornece middlewares para proteger rotas com base em papéis ou permissões.

1.  **Registrar Middlewares:** Certifique-se de que os middlewares estão registrados em `src/app/Http/Kernel.php`:
    ```php
    protected $routeMiddleware = [
        // ...
        'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
        'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
        'role_or_permission' => \Spatie\Permission\Middlewares\RoleOrPermissionMiddleware::class,
    ];
    ```

2.  **Aplicar nas Rotas (`src/routes/web.php`):**
    ```php
    Route::middleware(['auth', 'role:Admin'])->group(function () {
        Route::get('/admin/dashboard', function () {
            return 'Bem-vindo, Admin!';
        })->name('admin.dashboard');
    });

    Route::middleware(['auth', 'role:Student'])->group(function () {
        Route::get('/student/dashboard', function () {
            return 'Bem-vindo, Aluno!';
        })->name('student.dashboard');
    });

    // Exemplo com permissão
    Route::middleware(['auth', 'permission:edit articles'])->group(function () {
        Route::get('/articles/edit', function () {
            return 'Editar Artigo';
        });
    });
    ```

### Passo 5: Verificando Permissões em Views (Blade)

Você pode exibir ou ocultar elementos da interface do usuário com base nas permissões do usuário logado.

```blade
@role('Admin')
    <a href="/admin/dashboard">Painel Administrativo</a>
@endrole

@hasrole('Teacher')
    <p>Você é um professor.</p>
@else
    <p>Você não é um professor.</p>
@endhasrole

@can('edit articles')
    <button>Editar Artigo</button>
@else
    <button disabled>Visualizar Artigo</button>
@endcan
```

### Passo 6: Testando o Controle de Acesso

Crie testes de feature para verificar se o controle de acesso está funcionando como esperado.

**Código Sugerido (`src/tests/Feature/AccessControlTest.php`):**

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AccessControlTest extends TestCase
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

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertStatus(200);
        $response->assertSee('Bem-vindo, Admin!');
    }

    public function test_student_cannot_access_admin_dashboard(): void
    {
        $student = User::factory()->create();
        $student->assignRole('Student');

        $response = $this->actingAs($student)->get('/admin/dashboard');

        $response->assertStatus(403); // Forbidden
    }

    public function test_student_can_access_student_dashboard(): void
    {
        $student = User::factory()->create();
        $student->assignRole('Student');

        $response = $this->actingAs($student)->get('/student/dashboard');

        $response->assertStatus(200);
        $response->assertSee('Bem-vindo, Aluno!');
    }

    // Adicione mais testes para permissões específicas se necessário
}
```

## Próximo Passo e Verificação

1.  **Revise Seeders:** Certifique-se de que seus `RoleSeeder` e `AdminSeeder` estão criando os papéis e atribuindo-os corretamente.
2.  **Adicione Rotas Protegidas:** Inclua as rotas de exemplo no seu `src/routes/web.php` para testar os middlewares.
3.  **Implemente Verificações em Views:** Adicione as diretivas `@role`, `@hasrole` e `@can` em alguma view para testar a exibição condicional.
4.  **Crie os Testes:** Salve o conteúdo sugerido em `src/tests/Feature/AccessControlTest.php`.
5.  **Execute os Testes:**
    ```bash
    cd src && php artisan test --filter=AccessControlTest
    ```
    Verifique se os testes passam.
6.  **Teste Manualmente:** Faça login com diferentes tipos de usuários (Admin, Student) e tente acessar as rotas protegidas para confirmar o comportamento.

Parabéns! Você implementou um sistema de controle de acesso robusto, garantindo que apenas usuários autorizados possam acessar partes específicas da sua aplicação.