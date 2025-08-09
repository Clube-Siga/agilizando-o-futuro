# Sprint 20: Padrão Service e Repository para Organização de Código

## Objetivo da Sprint

Nesta Sprint, você aprofundará na organização do código Laravel utilizando os padrões **Service** e **Repository**. O objetivo é desacoplar a lógica de negócio dos Controllers e Models, promovendo um código mais limpo, testável, manutenível e escalável, essencial para aplicações de médio a grande porte.

## Conceitos Chave

-   **Padrão Service:** Uma camada dedicada a conter a lógica de negócio pura da aplicação. Os Services orquestram operações que podem envolver múltiplos Models, Repositories ou outras dependências, mantendo os Controllers "magros" e focados na requisição/resposta.
-   **Padrão Repository:** Uma camada de abstração entre a lógica de negócio e a camada de persistência de dados (banco de dados). O Repository encapsula a lógica de acesso a dados, permitindo que a aplicação interaja com os dados sem se preocupar com os detalhes de como eles são armazenados (Eloquent, SQL puro, NoSQL, etc.).
-   **Injeção de Dependência (Dependency Injection - DI):** Um padrão de design onde as dependências de um objeto são fornecidas a ele por um "container" (no Laravel, o Service Container), em vez de o objeto criá-las internamente. Isso facilita a testabilidade e a flexibilidade.
-   **Testabilidade:** A capacidade de testar unidades de código de forma isolada. Com Services e Repositories, é mais fácil mockar dependências e testar a lógica de negócio sem a necessidade de um banco de dados real ou requisições HTTP.

## A Jornada da Implementação (Passo a Passo)

Vamos refatorar uma funcionalidade existente (por exemplo, o `ContactService` que já temos) para ilustrar a aplicação desses padrões.

### Passo 1: Entendendo o `ContactService` Existente

Já temos um `ContactService` que lida com a criação de contatos. Vamos revisá-lo para ver como ele se encaixa no padrão Service.

**Código (`src/app/Services/ContactService.php`):**

```php
<?php

namespace App\Services;

use App\Models\Contact;
use App\Events\ContactCreatedEvent;

class ContactService
{
    public function createContact(array $data): Contact
    {
        $contact = Contact::create($data);

        // Dispara o evento após a criação do contato
        ContactCreatedEvent::dispatch($contact);

        return $contact;
    }
}
```

Este `ContactService` já é um bom exemplo de um Service, pois encapsula a lógica de criação do contato e o disparo do evento. No entanto, ele ainda interage diretamente com o Model `Contact`.

### Passo 2: Criando um Repository para o Modelo `Contact`

Vamos criar uma interface para o `ContactRepository` e uma implementação concreta. Isso nos permitirá trocar a implementação de persistência no futuro sem alterar o `ContactService`.

1.  **Criar a Interface (`src/app/Repositories/ContactRepositoryInterface.php`):**

    ```php
    <?php

    namespace App\Repositories;

    use App\Models\Contact;

    interface ContactRepositoryInterface
    {
        public function create(array $data): Contact;
        public function find(int $id): ?Contact;
        // Adicione outros métodos de acesso a dados aqui (update, delete, all, etc.)
    }
    ```

2.  **Criar a Implementação (`src/app/Repositories/EloquentContactRepository.php`):**

    ```php
    <?php

    namespace App\Repositories;

    use App\Models\Contact;

    class EloquentContactRepository implements ContactRepositoryInterface
    {
        public function create(array $data): Contact
        {
            return Contact::create($data);
        }

        public function find(int $id): ?Contact
        {
            return Contact::find($id);
        }
    }
    ```

### Passo 3: Injetando o Repository no Service

Agora, vamos injetar o `ContactRepositoryInterface` no `ContactService` via construtor. Isso é possível graças ao Service Container do Laravel.

**Código (`src/app/Services/ContactService.php` - Modificado):**

```php
<?php

namespace App\Services;

use App\Models\Contact;
use App\Events\ContactCreatedEvent;
use App\Repositories\ContactRepositoryInterface; // Importar a interface

class ContactService
{
    protected $contactRepository;

    public function __construct(ContactRepositoryInterface $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function createContact(array $data): Contact
    {
        $contact = $this->contactRepository->create($data); // Usar o repository

        // Dispara o evento após a criação do contato
        ContactCreatedEvent::dispatch($contact);

        return $contact;
    }
}
```

### Passo 4: Registrando o Binding no Service Container

Para que o Laravel saiba qual implementação usar quando `ContactRepositoryInterface` for solicitado, precisamos registrar um binding no Service Container. Isso geralmente é feito em um Service Provider.

**Código Sugerido (`src/app/Providers/AppServiceProvider.php` - no método `register`):**

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\ContactRepositoryInterface;
use App\Repositories\EloquentContactRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            ContactRepositoryInterface::class,
            EloquentContactRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
```

### Passo 5: Testando Services e Repositories

Com essa separação, testar se torna muito mais fácil. Você pode mockar o Repository ao testar o Service, e testar o Repository isoladamente.

**Exemplo de Teste para `ContactService` (Mockando o Repository):**

```php
<?php

namespace Tests\Unit\Services;

use App\Events\ContactCreatedEvent;
use App\Models\Contact;
use App\Repositories\ContactRepositoryInterface;
use App\Services\ContactService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ContactServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_contact_dispatches_event_and_returns_contact(): void
    {
        Event::fake(); // Impede que o evento seja realmente disparado

        $mockContact = new Contact(['id' => 1, 'name' => 'Test']);

        // Mock do repositório
        $mockRepository = $this->mock(ContactRepositoryInterface::class);
        $mockRepository->shouldReceive('create')
                       ->once()
                       ->andReturn($mockContact);

        // Instancia o serviço com o mock injetado
        $service = new ContactService($mockRepository);

        $data = ['name' => 'Test User', 'email' => 'test@example.com', 'subject' => 'Test Subject', 'formMessage' => 'Test Message'];
        $contact = $service->createContact($data);

        $this->assertInstanceOf(Contact::class, $contact);
        $this->assertEquals('Test', $contact->name);
        Event::assertDispatched(ContactCreatedEvent::class, function ($event) use ($contact) {
            return $event->contact->id === $contact->id;
        });
    }
}
```

## Próximo Passo e Verificação

1.  **Crie a Interface do Repository:** Salve o conteúdo sugerido em `src/app/Repositories/ContactRepositoryInterface.php`.
2.  **Crie a Implementação do Repository:** Salve o conteúdo sugerido em `src/app/Repositories/EloquentContactRepository.php`.
3.  **Modifique o `ContactService`:** Atualize `src/app/Services/ContactService.php` para injetar e usar o Repository.
4.  **Registre o Binding:** Adicione o binding no `register` de `src/app/Providers/AppServiceProvider.php`.
5.  **Crie o Teste Unitário:** Salve o conteúdo sugerido em `src/tests/Unit/Services/ContactServiceTest.php`.
6.  **Execute os Testes:**
    ```bash
    cd src && php artisan test --filter=ContactServiceTest
    ```
    Verifique se os testes passam.

Parabéns! Você implementou os padrões Service e Repository, tornando seu código mais modular, testável e fácil de manter. Esta é uma prática essencial para o desenvolvimento de software de alta qualidade.