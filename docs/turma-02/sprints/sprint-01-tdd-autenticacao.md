# Sprint 01: Fundamentos de Testes e TDD - Autenticação

## Bem-vindo à sua primeira Sprint de TDD!

Nesta Sprint, você não apenas aprenderá sobre Test-Driven Development (TDD), mas o **praticará** de forma imersiva. Nosso objetivo é construir testes robustos para a funcionalidade de autenticação do projeto, seguindo o ciclo **Red, Green, Refactor**.

Ao final desta Sprint, você terá uma compreensão sólida de como escrever testes de feature no Laravel e como o TDD guia o desenvolvimento de software.

### Pré-requisitos:

Certifique-se de que seu ambiente de desenvolvimento está configurado corretamente e que você já leu as aulas anteriores sobre:

*   [Configuração do Ambiente de Desenvolvimento](./../02-ambiente-desenvolvimento.md)
*   [O Ambiente de Teste e o Banco de Dados em Memória](./../turma-02-aula-01-banco-de-dados-de-teste.md)
*   [Resolvendo Problemas de Permissão em Ambientes Docker](./../turma-02-aula-02-resolvendo-permissoes.md)

---

## O Ciclo TDD: Red, Green, Refactor

O TDD é uma metodologia de desenvolvimento de software onde você escreve os testes *antes* de escrever o código da funcionalidade. Ele segue um ciclo de três passos:

1.  **Red (Vermelho):** Escreva um teste que falhe. Isso prova que a funcionalidade ainda não existe ou não está funcionando como esperado.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar. O objetivo aqui é apenas fazer o teste passar, sem se preocupar com a elegância do código.
3.  **Refactor (Refatorar):** Uma vez que o teste está verde, você pode refatorar o código (melhorar sua estrutura, legibilidade, performance) com a confiança de que o teste o protegerá contra a introdução de novos bugs.

---

## Sua Missão: Testando a Autenticação

Vamos trabalhar no arquivo `src/tests/Feature/Auth/AuthenticationTest.php`. Se ele não existir, crie-o.

### Teste 1: A Tela de Login Pode Ser Renderizada

**Objetivo:** Garantir que a página de login (`/login`) pode ser acessada e renderizada corretamente.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AuthenticationTest.php`:

```php
<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }
}
```

Execute o teste:

```bash
cd src && php artisan test --filter=AuthenticationTest::test_login_screen_can_be_rendered
```

**Resultado Esperado:** O teste deve passar (verde), pois a rota de login já existe e a página é renderizada. Se falhar, verifique sua configuração de ambiente.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, como a funcionalidade já existe, não há código a ser escrito para fazer o teste passar. Ele já deve estar verde.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 2: Usuários Podem se Autenticar com a Tela de Login

**Objetivo:** Simular o processo de login de um usuário existente e verificar se ele é autenticado com sucesso e redirecionado para o dashboard.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AuthenticationTest.php`:

```php
    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=AuthenticationTest::test_users_can_authenticate_using_the_login_screen
```

**Resultado Esperado:** O teste deve passar (verde), pois a funcionalidade de login já existe.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, como a funcionalidade já existe, não há código a ser escrito para fazer o teste passar. Ele já deve estar verde.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 3: Usuários Não Podem se Autenticar com Senha Inválida

**Objetivo:** Verificar se a aplicação impede o login com credenciais inválidas.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AuthenticationTest.php`:

```php
    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=AuthenticationTest::test_users_can_not_authenticate_with_invalid_password
```

**Resultado Esperado:** O teste deve passar (verde), pois a funcionalidade de login já existe.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, como a funcionalidade já existe, não há código a ser escrito para fazer o teste passar. Ele já deve estar verde.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 4: Usuários Podem Fazer Logout

**Objetivo:** Simular o processo de logout e verificar se o usuário é desautenticado.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AuthenticationTest.php`:

```php
    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=AuthenticationTest::test_users_can_logout
```

**Resultado Esperado:** O teste deve passar (verde), pois a funcionalidade de logout já existe.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, como a funcionalidade já existe, não há código a ser escrito para fazer o teste passar. Ele já deve estar verde.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

---

## Conclusão da Sprint 01

Parabéns! Você concluiu sua primeira Sprint de TDD. Você aprendeu a:

*   Escrever testes de feature para funcionalidades de autenticação.
*   Utilizar asserções comuns como `assertStatus`, `assertAuthenticated`, `assertGuest`, `assertRedirect`.
*   Compreender o ciclo Red, Green, Refactor na prática.

Você pode agora rodar todos os testes de autenticação para confirmar que estão todos passando:

```bash
cd src && php artisan test --filter=AuthenticationTest
```

No próximo Sprint, vamos abordar a funcionalidade de registro, aplicando os mesmos princípios de TDD.
