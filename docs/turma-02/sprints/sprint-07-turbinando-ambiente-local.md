# Sprint 07: Possíveis Problemas e Soluções Encontradas pelos Alunos

## Bem-vindo à Super Sprint 07!

Nesta Sprint, vamos transformar os desafios em aprendizado. Você enfrentou diversos problemas ao configurar o ambiente de desenvolvimento local, e cada um deles é uma oportunidade de ouro para entender a fundo como o Docker, Laravel Sail, Traefik e MySQL interagem. O objetivo é que, ao final, você não apenas tenha um ambiente funcional, mas também as ferramentas e o conhecimento para depurar problemas complexos por conta própria.

### Pré-requisitos:

*   Ter concluído as Sprints anteriores.
*   Ter o arquivo `docs/PLANO_DE_AULA.md` criado e atualizado.

---

## O Desafio: Um Ambiente de Desenvolvimento Robusto

Um ambiente de desenvolvimento local deve ser rápido, confiável e fácil de configurar. No entanto, a integração de múltiplas tecnologias pode gerar atritos. Nesta Sprint, vamos abordar os problemas mais comuns e suas soluções.

---

## Problema 1: "Page Not Found" e Roteamento do Traefik

Inicialmente, o acesso a `https://agilizando.local.dev` resultava em "Page Not Found".

### Diagnóstico:

O Traefik, nosso proxy reverso, recebia a requisição, mas não conseguia encaminhá-la corretamente para o serviço da aplicação. Isso ocorreu por dois motivos principais:

1.  **Configuração Incorreta do Nginx:** O serviço `nginx` no `src/docker-compose.yml` estava configurado para depender de um serviço chamado `agilizando`, que não existia. O nome correto do serviço PHP-FPM (Laravel) é `laravel.test`.
2.  **Complexidade Desnecessária:** Para o ambiente de desenvolvimento local, o Nginx como proxy intermediário entre o Traefik e o Laravel Sail era uma camada de complexidade que introduzia mais pontos de falha.

### Solução: Roteamento Direto do Traefik para o Laravel Sail

A solução mais eficiente para o ambiente de desenvolvimento é permitir que o Traefik se comunique diretamente com o contêiner do Laravel Sail.

**Passos:**

1.  **Remover o Serviço `nginx`:** Eliminamos o serviço `nginx` do `src/docker-compose.yml`.
2.  **Configurar o Serviço `laravel.test` para Servir HTTP:** Adicionamos `command: php -S 0.0.0.0:80 -t public` ao serviço `laravel.test` para que ele possa servir as requisições HTTP diretamente.
3.  **Adicionar Labels do Traefik ao `laravel.test`:** As labels do Traefik foram movidas para o serviço `laravel.test`, garantindo que o Traefik o descubra e roteie o tráfego corretamente.

**Exemplo de `src/docker-compose.yml` (após a correção):**

```yaml
services:
    laravel.test:
        build:
            context: ./vendor/laravel/sail/runtimes/8.4
            dockerfile: Dockerfile
            args:
                WWWGROUP: '${WWWGROUP:-1000}'
        image: sail-8.4/app
        extra_hosts:
            - 'host.docker.internal:host-gateway'
        ports:
            - '${APP_PORT:-80}:80'
            - '${VITE_PORT:-5173}:${VITE_PORT:-5173}'
        environment:
            WWWUSER: '${WWWUSER:-1000}'
            LARAVEL_SAIL: 1
            XDEBUG_MODE: '${SAIL_XDEBUG_MODE:-off}'
            XDEBUG_CONFIG: '${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}'
            IGNITION_LOCAL_SITES_PATH: '${PWD}'
        volumes:
            - '.:/var/www/html'
        networks:
            - sail
            - web-local # Adicionado para comunicação com Traefik
        depends_on:
            - mysql
            - redis
        command: php -S 0.0.0.0:80 -t public # Servir requisições HTTP diretamente
        labels:
            - "traefik.enable=true"
            - "traefik.http.routers.agilizando.rule=Host(`agilizando.local.dev`)"
            - "traefik.http.routers.agilizando.entrypoints=websecure"
            - "traefik.http.routers.agilizando.tls=true"
            - "traefik.http.services.agilizando.loadbalancer.server.port=80"
            - "traefik.docker.network=web-local"

    mysql:
        # ... (configuração do MySQL) ...

    redis:
        # ... (configuração do Redis) ...

networks:
    sail:
        driver: bridge
    web-local:
        external: true

volumes:
    sail-mysql:
        driver: local
    sail-redis:
        driver: local
```

---

## Problema 2: "could not find driver" (Extensões PHP)

Após resolver o roteamento, a aplicação Laravel retornava `could not find driver` ao tentar acessar o banco de dados.

### Diagnóstico:

Este erro indica que a extensão PHP necessária para se comunicar com o MySQL (`pdo_mysql`) não estava disponível no contêiner PHP. Isso ocorreu porque, em uma tentativa anterior de depuração, a imagem padrão do Laravel Sail foi substituída por uma imagem PHP genérica (`php:8.4-fpm-alpine`), que não inclui essa extensão por padrão.

### Solução: Usar a Imagem Padrão do Laravel Sail

A imagem padrão do Laravel Sail (`sail-X.X/app`) já vem com todas as extensões PHP necessárias pré-instaladas.

**Passos:**

1.  **Restaurar a Configuração de Build do Sail:** Garantimos que o serviço `laravel.test` no `src/docker-compose.yml` utilize a diretiva `build` apontando para o runtime correto do Sail (ex: `./vendor/laravel/sail/runtimes/8.4`).
2.  **Garantir `composer install`:** Certifique-se de que `composer install` foi executado no diretório `src/` para que os arquivos do Sail estejam presentes.

---

## Problema 3: "Access denied for user" (Credenciais e Privilégios do MySQL)

Mesmo com a imagem correta, o erro `Access denied for user 'sail'@'%' to database 'agilizando'` persistia.

### Diagnóstico:

Este é um problema clássico de credenciais ou privilégios. A investigação revelou que:

1.  **Conflito com Script de Teste:** O `docker-compose.yml` montava um script (`create-testing-database.sh`) que interferia na criação do banco de dados e do usuário padrão, concedendo privilégios apenas para bancos de dados de teste.
2.  **Banco de Dados Inexistente ou Sem Privilégios:** O banco de dados `agilizando` não estava sendo criado automaticamente, e o usuário `sail` não tinha privilégios sobre ele.

### Solução: Limpeza, Configuração Correta e Concessão Explícita de Privilégios

**Passos:**

1.  **Remover o Script de Teste:** Excluímos a linha que montava `../vendor/laravel/sail/database/mysql/create-testing-database.sh` do serviço `mysql` no `src/docker-compose.yml`.
2.  **Limpeza Completa do MySQL:** Para garantir uma inicialização limpa, removemos o volume persistente do MySQL e a imagem do MySQL.
    ```bash
    # No diretório src/
    ./vendor/bin/sail down -v
    docker rmi mysql/mysql-server:8.0 # Ou a versão que estiver usando
    ```
3.  **Configurar `DB_DATABASE` no `.env`:** Definimos `DB_DATABASE=agilizando` no `src/.env`.
4.  **Conceder Privilégios Manualmente (se necessário):** Embora a imagem do MySQL deva criar o usuário e o banco de dados com as variáveis de ambiente, em alguns casos, pode ser necessário conceder privilégios explicitamente.
    *   Obtenha o ID do contêiner MySQL: `docker ps --filter "name=src-mysql-1" --format "{{.ID}}"`
    *   Execute o comando SQL (substitua `ID_DO_CONTAINER` e `password` pela senha do root do MySQL):
        ```bash
        docker exec ID_DO_CONTAINER mysql -u root -ppassword -e "CREATE DATABASE IF NOT EXISTS agilizando; GRANT ALL PRIVILEGES ON agilizando.* TO 'sail'@'%'; FLUSH PRIVILEGES;"
        ```
    *   **Nota:** Se você preferir usar um usuário personalizado (ex: `webert`), certifique-se de que ele esteja definido no `.env` e que os privilégios sejam concedidos a ele.

---

## Problema 4: "Table 'agilizando.cache' doesn't exist" (Migrações Pendentes)

Após resolver os problemas de conexão, a aplicação reclamava que tabelas como `cache` não existiam.

### Diagnóstico:

Isso significa que a aplicação conseguiu se conectar ao banco de dados, mas as tabelas do Laravel ainda não haviam sido criadas.

### Solução: Rodar as Migrações do Laravel

As migrações do Laravel são responsáveis por criar o esquema do banco de dados.

**Passos:**

1.  **Executar Migrações:**
    ```bash
    # No diretório src/
    ./vendor/bin/sail artisan migrate
    ```

---

## Problema 5: "service 'agilizando' is not running" (APP_SERVICE no .env)

Ao tentar rodar comandos `sail artisan`, o erro `service 'agilizando' is not running` aparecia.

### Diagnóstico:

O Laravel Sail usa a variável `APP_SERVICE` no `.env` para saber qual serviço no `docker-compose.yml` ele deve interagir. Se o nome do serviço principal no `docker-compose.yml` é `laravel.test` e o `APP_SERVICE` no `.env` é `agilizando`, há um desalinhamento.

### Solução: Alinhar `APP_SERVICE` com o Nome do Serviço

**Passos:**

1.  **Atualizar `APP_SERVICE`:** No `src/.env`, altere `APP_SERVICE=agilizando` para `APP_SERVICE=laravel.test`.

---

## Problema 6: "Acesso Proibido" na Criação de Usuário (Seeders de Roles e Admin)

Após tudo funcionar, a criação de novos usuários como "aluno" resultava em "acesso proibido".

### Diagnóstico:

O sistema de permissões do Laravel (Spatie Permission) exige que as `Roles` (funções como Admin, Teacher, Student) existam no banco de dados para que possam ser atribuídas aos usuários. Além disso, para testar o login, precisamos de um usuário administrador.

### Solução: Rodar os Seeders de Roles e Admin

**Passos:**

1.  **Executar Seeders:**
    ```bash
    # No diretório src/
    ./vendor/bin/sail artisan db:seed
    ```
    Este comando executa o `DatabaseSeeder`, que por sua vez chama o `RoleSeeder` (cria as funções) e o `AdminSeeder` (cria o usuário administrador `webertcoach@gmail.com` com senha `12345678`).

---

## Conclusão da Super Sprint 07

Parabéns! Você não apenas superou uma série de desafios complexos, mas também aprendeu a depurar um ambiente de desenvolvimento Docker de forma eficaz. Você agora tem um ambiente local totalmente funcional e o conhecimento para resolver problemas comuns.

**Você aprendeu a:**

*   Diagnosticar e corrigir problemas de roteamento com Traefik.
*   Garantir que as extensões PHP corretas estejam disponíveis.
*   Depurar e resolver problemas de conexão e privilégios do MySQL.
*   Entender a importância das migrações e seeders do Laravel.
*   Alinhar configurações entre `.env` e `docker-compose.yml`.

Com esta base sólida, estamos prontos para avançar para as próximas Sprints, focando em otimização e escalabilidade.

---
