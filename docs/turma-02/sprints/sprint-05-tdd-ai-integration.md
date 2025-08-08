# Sprint 05: TDD e Integração com IA (Gemini CLI)

## Bem-vindo à Sprint 05!

Nesta Sprint, você explorará a fronteira da engenharia de software: **como testar funcionalidades que se integram com Inteligência Artificial**. Usaremos o conceito de interação com ferramentas como o Gemini CLI para entender como aplicar o TDD em cenários onde a lógica de negócio pode ser influenciada por uma IA.

Ao final desta Sprint, você terá uma compreensão prática de como abordar testes em sistemas que utilizam IA, focando na integração e no processamento das respostas, e não na "inteligência" da IA em si.

### Pré-requisitos:

Certifique-se de que concluiu as Sprints anteriores e que todos os seus testes estão passando:

*   [Sprint 01: Fundamentos de Testes e TDD - Autenticação](./sprint-01-tdd-autenticacao.md)
*   [Sprint 02: TDD na Prática - Funcionalidade de Registro](./sprint-02-tdd-registro.md)
*   [Sprint 03: TDD e Segurança - Corrigindo Vulnerabilidades NPM](./sprint-03-tdd-npm-audit.md)
*   [Sprint 04: TDD e Mocking - Testando Serviços Externos (RecaptchaService)](./sprint-04-tdd-recaptcha-service.md)

---

## O Ciclo TDD: Red, Green, Refactor (Revisão)

Lembre-se dos passos:

1.  **Red (Vermelho):** Escreva um teste que falhe.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar.
3.  **Refactor (Refatorar):** Melhore o código com a confiança de que o teste o protegerá.

---

## Sua Missão: Testando a Integração com IA

Para esta Sprint, vamos considerar uma funcionalidade hipotética (ou que você pode implementar no futuro) que utiliza uma IA. Imagine que queremos um serviço que sumarize o feedback dos usuários.

### O Desafio de Testar IA

Quando testamos uma integração com IA, não estamos testando a capacidade da IA de gerar uma boa sumarização. Estamos testando:

*   **O Prompt:** Se a nossa aplicação está construindo o prompt (a instrução para a IA) corretamente.
*   **A Chamada à API:** Se a nossa aplicação está chamando a API da IA corretamente (autenticação, parâmetros).
*   **O Parsing da Resposta:** Se a nossa aplicação está lendo e interpretando a resposta da IA corretamente.
*   **Tratamento de Erros:** Como a nossa aplicação lida com respostas inesperadas ou erros da API da IA.

### Usando Mocks para IA

Para manter nossos testes rápidos e determinísticos, vamos **simular** a resposta da IA. Não queremos que nossos testes dependam de uma chamada real à API do Gemini, que pode ser lenta, custosa ou ter limites de requisição.

Vamos criar um novo arquivo de teste, por exemplo, `src/tests/Feature/AISummarizationServiceTest.php`.

### Teste 1: O Serviço Constrói o Prompt Corretamente

**Objetivo:** Garantir que, dada uma entrada de usuário, o serviço de sumarização constrói o prompt adequado para a IA.

#### 🔴 Red (Escreva o Teste que Falha)

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Services\AISummarizationService; // Supondo que você criará este serviço

class AISummarizationServiceTest extends TestCase
{
    public function test_service_builds_prompt_correctly(): void
    {
        $service = new AISummarizationService();
        $feedback = "O produto é excelente, mas a entrega foi muito demorada.";
        $expectedPrompt = "Sumarize o seguinte feedback de usuário em uma frase: 'O produto é excelente, mas a entrega foi muito demorada.'";

        $this->assertEquals($expectedPrompt, $service->buildPrompt($feedback));
    }
}
```

Execute o teste:

```bash
cd src && php artisan test --filter=AISummarizationServiceTest::test_service_builds_prompt_correctly
```

**Resultado Esperado:** O teste deve falhar (vermelho), pois o método `buildPrompt` ainda não existe no `AISummarizationService`.

#### 🟢 Green (Faça o Teste Passar)

Crie o arquivo `src/app/Services/AISummarizationService.php` e adicione o método `buildPrompt`:

```php
<?php

namespace App\Services;

class AISummarizationService
{
    public function buildPrompt(string $text): string
    {
        return "Sumarize o seguinte feedback de usuário em uma frase: '".$text."'";
    }
}
```

Execute o teste novamente. Ele deve passar (verde).

#### ♻️ Refactor (Melhore o Código)

Não aplicável para este teste simples.

### Teste 2: O Serviço Processa a Resposta da IA Corretamente

**Objetivo:** Garantir que o serviço extrai a sumarização da resposta simulada da IA.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AISummarizationServiceTest.php`:

```php
use Illuminate\Support\Facades\Http; // Adicione esta linha no topo do arquivo

    public function test_service_processes_ai_response_correctly(): void
    {
        // Simule a resposta da API da IA (ex: Gemini CLI)
        Http::fake([
            'https://api.gemini.com/v1/models/gemini-pro:generateContent' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => 'Sumarização do feedback.']
                            ]
                        ]
                    ]
                ]
            ], 200)
        ]);

        $service = new AISummarizationService();
        $feedback = "Algum feedback aqui.";
        $expectedSummary = "Sumarização do feedback.";

        $this->assertEquals($expectedSummary, $service->summarize($feedback));
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=AISummarizationServiceTest::test_service_processes_ai_response_correctly
```

**Resultado Esperado:** O teste deve falhar (vermelho), pois o método `summarize` ainda não existe ou não implementa a lógica de chamada e parsing.

#### 🟢 Green (Faça o Teste Passar)

Adicione o método `summarize` ao seu `AISummarizationService.php`:

```php
use Illuminate\Support\Facades\Http;

class AISummarizationService
{
    public function buildPrompt(string $text): string
    {
        return "Sumarize o seguinte feedback de usuário em uma frase: '".$text."'";
    }

    public function summarize(string $feedback): string
    {
        $prompt = $this->buildPrompt($feedback);

        // Simule a chamada à API da IA (em um ambiente real, seria uma chamada HTTP real)
        $response = Http::post('https://api.gemini.com/v1/models/gemini-pro:generateContent', [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ])->json();

        return $response['candidates'][0]['content']['parts'][0]['text'];
    }
}
```

Execute o teste novamente. Ele deve passar (verde).

#### ♻️ Refactor (Melhore o Código)

Você pode refatorar o `summarize` para lidar com diferentes formatos de resposta da IA ou erros.

### Teste 3: O Serviço Lida com Erros da IA

**Objetivo:** Garantir que o serviço trata adequadamente as respostas de erro da API da IA.

#### 🔴 Red (Escreva o Teste que Falha)

Adicione o seguinte método ao seu `AISummarizationServiceTest.php`:

```php
    public function test_service_handles_ai_errors(): void
    {
        Http::fake([
            'https://api.gemini.com/v1/models/gemini-pro:generateContent' => Http::response([
                'error' => [
                    'message' => 'API rate limit exceeded.'
                ]
            ], 429) // Simula um erro de limite de taxa
        ]);

        $service = new AISummarizationService();
        $feedback = "Algum feedback.";

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('API rate limit exceeded.');

        $service->summarize($feedback);
    }
```

Execute o teste:

```bash
cd src && php artisan test --filter=AISummarizationServiceTest::test_service_handles_ai_errors
```

**Resultado Esperado:** O teste deve passar (verde), pois o método `summarize` já deve lançar uma exceção ao receber um erro da API.

#### 🟢 Green (Faça o Teste Passar)

Neste caso, o teste já deve passar.

#### ♻️ Refactor (Melhore o Código)

Você pode refatorar o `summarize` para lançar exceções mais específicas ou retornar um objeto de erro.

---

## Conclusão da Sprint 05

Parabéns! Você concluiu a Sprint 05. Você aprendeu a:

*   Abordar o TDD para funcionalidades que se integram com IA.
*   Utilizar **Mocking** para simular respostas de APIs de IA.
*   Testar a construção de prompts, o parsing de respostas e o tratamento de erros em integrações com IA.

Você pode agora rodar todos os testes do `AISummarizationServiceTest` para confirmar que estão todos passando:

```bash
cd src && php artisan test --filter=AISummarizationServiceTest
```

No próximo Sprint, abordaremos a integração com o Gemini CLI ou outras funcionalidades.
