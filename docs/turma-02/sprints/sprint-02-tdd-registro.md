# Sprint 02: TDD na Prática - Funcionalidade de Registro

## Bem-vindo à Sprint 02!

Nesta Sprint, continuaremos nossa jornada no Test-Driven Development (TDD), focando em uma funcionalidade essencial: o **Registro de Novos Usuários**. Você enfrentará desafios de validação de dados e aprenderá a depurar seus testes de forma eficaz, sempre seguindo o ciclo **Red, Green, Refactor**.

Ao final desta Sprint, você terá uma compreensão aprofundada de como lidar com validações complexas em testes de feature e como o TDD o ajuda a construir funcionalidades robustas.

### Pré-requisitos:

Certifique-se de que concluiu a [Sprint 01: Fundamentos de Testes e TDD - Autenticação](./sprint-01-tdd-autenticacao.md) e que todos os seus testes estão passando.

---

## O Ciclo TDD: Red, Green, Refactor (Revisão)

Lembre-se dos passos:

1.  **Red (Vermelho):** Escreva um teste que falhe.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar.
3.  **Refactor (Refatorar):** Melhore o código com a confiança de que o teste o protegerá.

---

## Sua Missão: Testando o Registro de Usuários

Vamos trabalhar no arquivo `src/tests/Feature/Auth/RegistrationTest.php`. Se ele não existir, crie-o.

### Teste 1: A Tela de Registro Pode Ser Renderizada

**Objetivo:** Garantir que a página de registro (`/register`) pode ser acessada e renderizada corretamente.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RegistrationTest.php`:

```php
<?php

namespace Tests\Feature\Auth;

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
}
```

Execute o teste:

```bash
cd src && php artisan test --filter=RegistrationTest::test_registration_screen_can_be_rendered
```

**Resultado Esperado:** O teste deve passar (verde), pois a rota de registro já existe e a página é renderizada. Se falhar, verifique sua configuração de ambiente.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, como a funcionalidade já existe, não há código a ser escrito para fazer o teste passar. Ele já deve estar verde.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 2: Novos Usuários Podem se Registrar

**Objetivo:** Simular o processo de registro de um novo usuário, incluindo todas as validações necessárias, e verificar se ele é criado e autenticado com sucesso.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RegistrationTest.php`:

```php
use App\Models\User; // Adicione esta linha no topo do arquivo

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            // Inicialmente, o teste falhará aqui, pois faltam campos de validação
        ]);

        // Verifique se não há erros de validação na sessão
        $response->assertSessionHasNoErrors();

        // Busque o usuário no banco de dados e verifique se ele foi criado
        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user); 

        // Verifique se o usuário está autenticado e redirecionado para o dashboard
        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=RegistrationTest::test_new_users_can_register
```

**Resultado Esperado:** O teste deve **falhar** (vermelho). A falha inicial será devido a erros de validação, pois o formulário de registro exige mais campos do que estamos fornecendo.

#### 🟢 Green (Faça o Teste Passar)

Para fazer o teste passar, você precisará adicionar os campos que a validação da aplicação exige. Lembre-se que o Laravel possui validações específicas para CPF e celular com DDD.

Modifique o método `test_new_users_can_register` para incluir os seguintes campos com valores válidos:

```php
    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'cpf' => '849.314.730-32', // CPF válido para testes
            'date_of_birth' => '2000-01-01',
            'mobile' => '(11) 99999-9999', // Celular com DDD válido
            'terms' => true, // Aceite dos termos
            'userType' => 'Student', // Tipo de usuário
        ]);

        $response->assertSessionHasNoErrors();

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user); 

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
```

Execute o teste novamente:

```bash
cd src && php artisan test --filter=RegistrationTest::test_new_users_can_register
```

**Resultado Esperado:** O teste deve passar (verde). Se ainda houver falhas, revise as mensagens de erro e os formatos dos dados. Lembre-se que o `cpf` e `mobile` devem seguir as regras de validação brasileiras. Você pode usar geradores de dados válidos como [4Devs - Gerador de CPF](https://www.4devs.com.br/gerador_de_cpf) para obter exemplos.

#### ♻️ Refactor (Melhore o Código)

Neste caso, a refatoração principal foi a adição dos campos necessários para que o teste passasse. Não há refatorações adicionais para este teste simples.

---

## Conclusão da Sprint 02

Parabéns! Você concluiu a Sprint 02. Você aprendeu a:

*   Escrever testes de feature para funcionalidades de registro.
*   Lidar com validações de formulário complexas em testes.
*   Utilizar o ciclo Red, Green, Refactor para guiar o desenvolvimento.

Você pode agora rodar todos os testes de registro para confirmar que estão todos passando:

```bash
cd src && php artisan test --filter=RegistrationTest
```

No próximo Sprint, abordaremos a correção de vulnerabilidades de segurança, aplicando os mesmos princípios de TDD.
