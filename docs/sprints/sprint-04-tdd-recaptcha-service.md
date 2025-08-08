# Sprint 04: TDD e Mocking - Testando Serviços Externos (RecaptchaService)

## Bem-vindo à Sprint 04!

Nesta Sprint, você enfrentará um desafio comum no desenvolvimento de software: **testar funcionalidades que interagem com serviços externos**. Usaremos o `RecaptchaService` como nosso estudo de caso para aprender a técnica de **Mocking**, essencial para criar testes rápidos, confiáveis e isolados.

Ao final desta Sprint, você terá uma compreensão prática de como simular respostas de APIs externas, garantindo que seus testes validem a lógica da sua aplicação, e não a disponibilidade de um serviço de terceiros.

### Pré-requisitos:

Certifique-se de que concluiu as Sprints anteriores e que todos os seus testes estão passando:

*   [Sprint 01: Fundamentos de Testes e TDD - Autenticação](./sprint-01-tdd-autenticacao.md)
*   [Sprint 02: TDD na Prática - Funcionalidade de Registro](./sprint-02-tdd-registro.md)
*   [Sprint 03: TDD e Segurança - Corrigindo Vulnerabilidades NPM](./sprint-03-tdd-npm-audit.md)

---

## O Ciclo TDD: Red, Green, Refactor (Revisão)

Lembre-se dos passos:

1.  **Red (Vermelho):** Escreva um teste que falhe.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar.
3.  **Refactor (Refatorar):** Melhore o código com a confiança de que o teste o protegerá.

---

## Sua Missão: Testando o RecaptchaService

Vamos trabalhar no arquivo `src/tests/Feature/RecaptchaServiceTest.php`. Se ele não existir, crie-o.

### O RecaptchaService: Uma Ponte para o Google

O `RecaptchaService` é responsável por se comunicar com a API do Google reCAPTCHA para verificar se uma interação é legítima (não é um robô). Testar essa comunicação diretamente seria lento e dependeria da conexão com a internet. É aqui que o **Mocking** entra.

### Teste 1: Obtendo a Chave Secreta

**Objetivo:** Garantir que o serviço pode recuperar a chave secreta configurada.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RecaptchaServiceTest.php`:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Http; // metodos prontos

// criar uma simulacao pra zombar ou enganar a classe testada simulando o processo real
use Mockery;
use Mockery\MockInterface;
use App\Services\RecaptchaService;


class RecaptchaServiceTest extends TestCase
{
    public function testGetSecretKey()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a chave secreta esperada (lida da configuração)
        $expectedSecretKey = config('services.google_recaptcha.secret_key');

        // Verifique se a chave secreta retornada corresponde à esperada
        $this->assertEquals($expectedSecretKey, $recaptchaService->getSecretKey());
    }
}
```

Execute o teste:

```bash
cd src && php artisan test --filter=RecaptchaServiceTest::testGetSecretKey
```

**Resultado Esperado:** O teste deve passar (verde), pois já configuramos a variável de ambiente no `phpunit.xml` e o serviço já a lê corretamente.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, o teste já deve passar.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 2: Obtendo a Chave do Site

**Objetivo:** Garantir que o serviço pode recuperar a chave do site configurada.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RecaptchaServiceTest.php`:

```php
    public function testGetSitetKey()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a chave do site esperada
        $expectedSiteKey = config('services.google_recaptcha.site_key');

        // Verifique se a chave do site retornada corresponde à esperada
        $this->assertEquals($expectedSiteKey, $recaptchaService->getSiteKey());
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=RecaptchaServiceTest::testGetSitetKey
```

**Resultado Esperado:** O teste deve passar (verde).

#### 🟢 Green (Faça o Teste Passar)

Neste caso, o teste já deve passar.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 3: Obtendo a URL Base

**Objetivo:** Garantir que o serviço pode recuperar a URL base da API do reCAPTCHA.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RecaptchaServiceTest.php`:

```php
    public function testGetBaseUrl()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a URL esperada
        $expectedUrl = config('services.google_recaptcha.url');

        // Verifique se a URL retornada corresponde à esperada
        $this->assertEquals($expectedUrl, $recaptchaService->getBaseUrl());
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=RecaptchaServiceTest::testGetBaseUrl
```

**Resultado Esperado:** O teste deve passar (verde).

#### 🟢 Green (Faça o Teste Passar)

Neste caso, o teste já deve passar.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 4: Verificando o Token reCAPTCHA com Mocking

**Objetivo:** Testar o método `verify` do `RecaptchaService`, simulando a resposta da API do Google reCAPTCHA.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `RecaptchaServiceTest.php`:

```php
    public function testVerify()
    {
        // Usamos Http::fake() para simular a resposta da API externa
        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'submit',
                'challenge_ts' => '2024-05-27T12:00:00Z',
                'hostname' => 'teste.clubesiga.com'
            ], 200)
        ]);

        $recaptchaService = new RecaptchaService();

        $data = [
            'secret' => config('services.google_recaptcha.secret_key'),
            'response' => 'fake-recaptcha-token',
            'remoteip' => '127.0.0.1'
        ];

        $response = $recaptchaService->verify($data);

        // Verifique se a resposta simulada foi processada corretamente
        $this->assertTrue($response->json('success'));
        $this->assertEquals(0.9, $response->json('score'));
        $this->assertEquals('submit', $response->json('action'));
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=RecaptchaServiceTest::testVerify
```

**Resultado Esperado:** O teste deve passar (verde), pois já corrigimos o `TypeError` e o mocking do `Http` facade já está funcionando.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, o teste já deve passar.

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

---

## Conclusão da Sprint 04

Parabéns! Você concluiu a Sprint 04. Você aprendeu a:

*   Escrever testes para serviços que interagem com APIs externas.
*   Utilizar o **Mocking** (com `Http::fake()`) para simular respostas de serviços externos.
*   Garantir que seus testes sejam isolados, rápidos e determinísticos.

Você pode agora rodar todos os testes do `RecaptchaServiceTest` para confirmar que estão todos passando:

```bash
cd src && php artisan test --filter=RecaptchaServiceTest
```

No próximo Sprint, abordaremos a criação de testes para outras funcionalidades ou a integração com ferramentas de IA.
