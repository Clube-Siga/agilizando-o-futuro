# Sprint 17: Implementando Páginas Estáticas e SEO Básico

## Objetivo da Sprint

Nesta Sprint, você aprenderá a criar e documentar a implementação de páginas estáticas essenciais, como "Termos de Acordo" e "Políticas de Privacidade", em uma aplicação Laravel. Além disso, abordaremos considerações básicas de SEO (Search Engine Optimization) para garantir que essas páginas sejam amigáveis para mecanismos de busca.

## Conceitos Chave

-   **Páginas Estáticas:** Conteúdo que não muda frequentemente e não depende de dados dinâmicos de um banco de dados (ex: "Sobre Nós", "Contato", "Termos de Uso").
-   **SEO Básico:** Um conjunto de práticas para otimizar um site para que ele apareça em posições mais altas nos resultados de busca orgânica (não paga) de mecanismos como o Google.
-   **Meta Tags:** Elementos HTML (`<meta>`) que fornecem metadados sobre uma página web, como descrição, palavras-chave e título, para navegadores e mecanismos de busca.
-   **Laravel Routes:** O sistema de roteamento do Laravel que mapeia URLs para ações em Controllers ou Closures.
-   **Laravel Views:** Os arquivos Blade (`.blade.php`) que contêm o HTML e a lógica de apresentação da sua aplicação.

## A Jornada da Implementação (Passo a Passo)

Vamos implementar as páginas de "Termos de Acordo" e "Políticas de Privacidade".

### Passo 1: Criando as Views (Templates Blade)

Primeiro, criaremos os arquivos Blade para o conteúdo de cada página. É uma boa prática reutilizar o layout principal da sua aplicação.

**Código Sugerido (`src/resources/views/pages/terms.blade.php`):**

```blade
@extends('layouts.app') {{-- Ou o layout principal da sua aplicação --}}

@section('title', 'Termos de Acordo')
@section('description', 'Leia nossos termos de acordo para entender as regras de uso da plataforma.')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Termos de Acordo</h1>
    <div class="prose max-w-none">
        <p>Bem-vindo aos Termos de Acordo do Agilizando o Futuro. Ao acessar e utilizar nossa plataforma, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Por favor, leia-os cuidadosamente.</p>
        
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao utilizar a plataforma, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos de Acordo, bem como à nossa Política de Privacidade.</p>

        <h2>2. Uso da Plataforma</h2>
        <p>A plataforma Agilizando o Futuro destina-se a fins educacionais e de desenvolvimento profissional. Você concorda em usar a plataforma apenas para fins lícitos e de maneira que não infrinja os direitos de, ou restrinja ou iniba o uso e o desfrute da plataforma por terceiros.</p>

        <h2>3. Propriedade Intelectual</h2>
        <p>Todo o conteúdo presente na plataforma, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade do Agilizando o Futuro ou de seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais internacionais.</p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>O Agilizando o Futuro não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares, incluindo, mas não se limitando a, danos por perda de lucros, boa vontade, uso, dados ou outras perdas intangíveis (mesmo que o Agilizando o Futuro tenha sido avisado da possibilidade de tais danos), resultantes do uso ou da incapacidade de usar a plataforma.</p>

        <h2>5. Alterações nos Termos</h2>
        <p>Reservamo-nos o direito de modificar estes Termos de Acordo a qualquer momento. Quaisquer alterações serão publicadas nesta página, e a data da última atualização será revisada. Seu uso continuado da plataforma após a publicação de quaisquer alterações constitui sua aceitação de tais alterações.</p>

        <h2>6. Lei Aplicável</h2>
        <p>Estes Termos de Acordo serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus conflitos de provisões legais.</p>

        <h2>7. Contato</h2>
        <p>Se você tiver alguma dúvida sobre estes Termos de Acordo, entre em contato conosco através do nosso formulário de contato.</p>

        <p class="text-sm text-gray-500 mt-8">Última atualização: 8 de agosto de 2025</p>
    </div>
</div>
@endsection
```

**Código Sugerido (`src/resources/views/pages/privacy.blade.php`):**

```blade
@extends('layouts.app') {{-- Ou o layout principal da sua aplicação --}}

@section('title', 'Políticas de Privacidade')
@section('description', 'Conheça nossas políticas de privacidade e como tratamos seus dados.')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Políticas de Privacidade</h1>
    <div class="prose max-w-none">
        <p>A sua privacidade é de extrema importância para o Agilizando o Futuro. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.</p>

        <h2>1. Informações que Coletamos</h2>
        <p>Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail e outras informações de contato quando você se registra, preenche formulários ou interage com nossos serviços.</p>

        <h2>2. Como Usamos Suas Informações</h2>
        <p>Utilizamos as informações coletadas para:</p>
        <ul>
            <li>Fornecer, operar e manter nossa plataforma.</li>
            <li>Melhorar, personalizar e expandir nossa plataforma.</li>
            <li>Entender e analisar como você usa nossa plataforma.</li>
            <li>Desenvolver novos produtos, serviços, recursos e funcionalidades.</li>
            <li>Comunicar-nos com você, diretamente ou através de um de nossos parceiros, para atendimento ao cliente, para fornecer atualizações e outras informações relacionadas à plataforma, e para fins de marketing e promoção.</li>
            <li>Enviar e-mails.</li>
            <li>Encontrar e prevenir fraudes.</li>
        </ul>

        <h2>3. Compartilhamento de Informações</h2>
        <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços, cumprir a lei ou proteger nossos direitos.</p>

        <h2>4. Segurança dos Dados</h2>
        <p>Implementamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.</p>

        <h2>5. Seus Direitos de Privacidade</h2>
        <p>Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais. Para exercer esses direitos, entre em contato conosco.</p>

        <h2>6. Alterações nesta Política de Privacidade</h2>
        <p>Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.</p>

        <h2>7. Contato</h2>
        <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do nosso formulário de contato.</p>

        <p class="text-sm text-gray-500 mt-8">Última atualização: 8 de agosto de 2025</p>
    </div>
</div>
@endsection
```

### Passo 2: Criando o Controller

Vamos criar um `PageController` simples para renderizar essas views. Este controller será responsável apenas por exibir as páginas estáticas.

**Código Sugerido (`src/app/Http/Controllers/PageController.php`):**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function terms()
    {
        return Inertia::render('Pages/Terms');
    }

    public function privacy()
    {
        return Inertia::render('Pages/Privacy');
    }
}
```

### Passo 3: Definindo as Rotas

Agora, vamos adicionar as rotas para essas páginas no arquivo `src/routes/web.php`.

**Código Sugerido (`src/routes/web.php` - Adicionar ao final do arquivo ou na seção de rotas públicas):**

```php
// Rotas para Páginas Estáticas
Route::get('/termos-de-acordo', [\App\Http\Controllers\PageController::class, 'terms'])->name('terms');
Route::get('/politicas-de-privacidade', [\App\Http\Controllers\PageController::class, 'privacy'])->name('privacy');
```

### Passo 4: SEO Básico com Meta Tags

As meta tags são essenciais para o SEO. No Laravel, você pode passá-las para o seu layout principal e renderizá-las dinamicamente.

No exemplo das views (`terms.blade.php` e `privacy.blade.php`), já incluímos `@section('title', ...)` e `@section('description', ...)`.

Você precisará garantir que seu layout principal (`layouts.app` ou similar) renderize essas seções dentro da tag `<head>`.

**Exemplo (`src/resources/views/layouts/app.blade.php` - dentro da tag `<head>`):**

```blade
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', config('app.name', 'Laravel'))</title>
    <meta name="description" content="@yield('description', config('app.name', 'Laravel'))">

    <!-- Outras meta tags, links CSS, etc. -->
</head>
```

### Passo 5: Testando as Páginas Estáticas

Para garantir que as páginas estão funcionando corretamente, você pode criar testes de feature simples.

**Código Sugerido (`src/tests/Feature/StaticPagesTest.php`):**

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StaticPagesTest extends TestCase
{
    /**
     * Testa se a página de Termos de Acordo pode ser acessada.
     */
    public function test_terms_page_can_be_accessed(): void
    {
        $response = $this->get('/termos-de-acordo');

        $response->assertStatus(200);
        $response->assertSee('Termos de Acordo');
    }

    /**
     * Testa se a página de Políticas de Privacidade pode ser acessada.
     */
    public function test_privacy_page_can_be_accessed(): void
    {
        $response = $this->get('/politicas-de-privacidade');

        $response->assertStatus(200);
        $response->assertSee('Políticas de Privacidade');
    }
}
```

## Próximo Passo e Verificação

1.  **Crie os arquivos de View:** Salve os conteúdos sugeridos em `src/resources/views/pages/terms.blade.php` e `src/resources/views/pages/privacy.blade.php`.
2.  **Crie o Controller:** Salve o conteúdo sugerido em `src/app/Http/Controllers/PageController.php`.
3.  **Adicione as Rotas:** Inclua as rotas no seu `src/routes/web.php`.
4.  **Verifique o Layout:** Certifique-se de que seu layout principal (`layouts.app.blade.php`) renderiza as meta tags de título e descrição.
5.  **Crie os Testes:** Salve o conteúdo sugerido em `src/tests/Feature/StaticPagesTest.php`.
6.  **Execute os Testes:**
    ```bash
    cd src && php artisan test --filter=StaticPagesTest
    ```
    Verifique se os testes passam.
7.  **Acesse as Páginas:** Navegue para `/termos-de-acordo` e `/politicas-de-privacidade` no seu navegador para confirmar que as páginas são exibidas corretamente.

Parabéns! Você implementou páginas estáticas com SEO básico, uma funcionalidade fundamental para qualquer aplicação web.