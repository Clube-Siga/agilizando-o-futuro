# Capítulo 3: A Caixa de Ferramentas - Ambiente de Desenvolvimento

Para construir um grande projeto, você precisa das ferramentas certas. Este capítulo é o seu guia para montar um ambiente de desenvolvimento local completo e profissional, espelhando as melhores práticas do mercado.

## 1. As Ferramentas Base

Antes de tocar no código do projeto, precisamos garantir que sua máquina tenha o software fundamental instalado.

*   **PHP 8.2+:** O coração da nossa aplicação. O Laravel, nosso framework backend, requer a versão 8.2 ou superior.
    *   **Instalação:** Use um gerenciador de pacotes como `apt` (Ubuntu), `brew` (macOS) ou baixe diretamente do [site oficial do PHP](https://www.php.net/downloads.php).
    *   **Composer:** É o gerenciador de dependências para PHP. Após instalar o PHP, siga as instruções em [getcomposer.org](https://getcomposer.org/download/) para instalá-lo globalmente.

*   **Node.js 20.x (LTS):** O motor do nosso frontend. Usamos Node para compilar nossos arquivos JavaScript (React) e gerenciar as dependências de frontend.
    *   **Instalação:** Recomendamos usar um gerenciador de versões como o `nvm` (Node Version Manager). Isso permite que você tenha várias versões do Node instaladas e troque entre elas facilmente. Siga as instruções de instalação no [repositório do nvm](https://github.com/nvm-sh/nvm).
    *   Depois de instalar o `nvm`, instale e use a versão LTS com os comandos: `nvm install 20` e `nvm use 20`.

*   **Docker e Docker Compose:** A magia da conteinerização. O Docker nos permite rodar um ambiente de desenvolvimento idêntico ao de produção, de forma isolada e sem "sujar" sua máquina.
    *   **Instalação:** Siga o guia oficial para o seu sistema operacional em [docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).

## 2. Configurando o Projeto

Com as ferramentas prontas, vamos preparar o projeto.

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Clube-Siga/agilizando-o-futuro.git
    cd agilizando.clubesiga.com.br/src
    ```
    *Note que entramos na pasta `src` para os próximos comandos.*

2.  **Instale as Dependências:**
    ```bash
    # Instalar dependências do PHP
    composer install

    # Instalar dependências do Node.js
    npm install
    ```

3.  **Configure o Ambiente:**
    ```bash
    # Crie seu arquivo de ambiente a partir do exemplo
    cp .env.example .env

    # Gere a chave de aplicação do Laravel
    php artisan key:generate
    ```

## 3. Rodando o Ambiente com Laravel Sail

O Laravel Sail é uma interface de linha de comando para interagir com o ambiente Docker padrão do Laravel. Ele simplifica tudo.

1.  **Inicie os Contêineres:**
    ```bash
    # O `-d` executa em modo "detached" (em segundo plano)
    ./vendor/bin/sail up -d
    ```

2.  **Rode as Migrações do Banco de Dados:**
    ```bash
    # Isso criará as tabelas do banco de dados dentro do contêiner
    ./vendor/bin/sail artisan migrate --seed
    ```

3.  **Compile os Assets de Frontend:**
    ```bash
    # Inicia o servidor de desenvolvimento do Vite
    npm run dev
    ```

Neste ponto, sua aplicação estará rodando! Você pode acessá-la em [http://localhost](http://localhost).

---

## 4. Configuração Detalhada do Banco de Dados MySQL para Desenvolvimento

A configuração do banco de dados é um ponto crítico no ambiente de desenvolvimento. O Laravel Sail simplifica muito, mas entender como ele funciona e como depurar problemas é essencial.

### 4.1. Variáveis de Ambiente do Banco de Dados (`.env`)

No seu arquivo `src/.env`, as seguintes variáveis controlam a conexão com o MySQL:

```dotenv
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=agilizando
DB_USERNAME=sail
DB_PASSWORD=password
```

*   `DB_HOST=mysql`: O nome do serviço do MySQL no `docker-compose.yml` é `mysql`. Dentro da rede Docker, os serviços podem se comunicar usando seus nomes.
*   `DB_DATABASE=agilizando`: O nome do banco de dados que a aplicação usará.
*   `DB_USERNAME=sail` e `DB_PASSWORD=password`: São as credenciais padrão que o Laravel Sail configura para o MySQL.

### 4.2. Serviço MySQL no `docker-compose.yml`

O serviço `mysql` no `src/docker-compose.yml` utiliza essas variáveis para inicializar o banco de dados e o usuário:

```yaml
    mysql:
        image: 'mysql/mysql-server:8.0'
        ports:
            - '${FORWARD_DB_PORT:-3306}:3306'
        environment:
            MYSQL_ROOT_PASSWORD: '${DB_PASSWORD}'
            MYSQL_ROOT_HOST: "%"
            MYSQL_DATABASE: '${DB_DATABASE}'
            MYSQL_USER: '${DB_USERNAME}'
            MYSQL_PASSWORD: '${DB_PASSWORD}'
            MYSQL_ALLOW_EMPTY_PASSWORD: 1
        volumes:
            - 'sail-mysql:/var/lib/mysql'
        networks:
            - sail
        healthcheck:
            test:
                - CMD
                - mysqladmin
                - ping
                - '-p${DB_PASSWORD}'
            retries: 3
            timeout: 5s
```

---

### 4.3. Problemas Comuns e Soluções na Conexão com o Banco de Dados

Durante a configuração, você pode encontrar alguns erros. Aqui estão os mais comuns e como resolvê-los:

#### Problema: `could not find driver`

**Diagnóstico:** Este erro indica que a extensão PHP necessária para se comunicar com o MySQL (`pdo_mysql`) não está disponível no contêiner PHP.

**Solução:** Garanta que você está usando a imagem padrão do Laravel Sail, que já vem com as extensões necessárias. Se você alterou o `docker-compose.yml` para usar uma imagem PHP genérica, reverta para a configuração padrão do Sail.

**Verificação:**
*   No `src/docker-compose.yml`, o serviço `laravel.test` deve ter uma diretiva `build` apontando para o runtime do Sail (ex: `context: ./vendor/laravel/sail/runtimes/8.4`).
*   Execute `composer install` no diretório `src/` para garantir que os arquivos do Sail estejam presentes.

#### Problema: `Access denied for user 'sail'@'%' to database 'agilizando'` ou `Access denied for user 'root'@'localhost'`

**Diagnóstico:** Este é um problema de credenciais ou privilégios. O usuário existe, mas não tem permissão para acessar o banco de dados ou a senha está incorreta.

**Solução:**

1.  **Limpeza Completa do MySQL:** Para garantir uma inicialização limpa do MySQL com as credenciais corretas, remova o volume persistente do MySQL e a imagem do MySQL.
    ```bash
    # No diretório src/
    ./vendor/bin/sail down -v
    docker rmi mysql/mysql-server:8.0 # Ou a versão que estiver usando
    ```
2.  **Subir o Ambiente:**
    ```bash
    # No diretório src/
    ./vendor/bin/sail up -d
    ```
3.  **Conceder Privilégios Manualmente (se necessário):** Embora a imagem do MySQL deva criar o usuário e o banco de dados com as variáveis de ambiente, em alguns casos, pode ser necessário conceder privilégios explicitamente.
    *   Obtenha o ID do contêiner MySQL: `docker ps --filter "name=src-mysql-1" --format "{{.ID}}"`
    *   Execute o comando SQL (substitua `ID_DO_CONTAINER` e `password` pela senha do root do MySQL, que é `DB_PASSWORD` do seu `.env`):
        ```bash
        docker exec ID_DO_CONTAINER mysql -u root -ppassword -e "CREATE DATABASE IF NOT EXISTS agilizando; GRANT ALL PRIVILEGES ON agilizando.* TO 'sail'@'%'; FLUSH PRIVILEGES;"
        ```
    *   **Nota:** Se você preferir usar um usuário personalizado (ex: `webert`), certifique-se de que ele esteja definido no `.env` e que os privilégios sejam concedidos a ele.

#### Problema: `Table 'agilizando.cache' doesn't exist`

**Diagnóstico:** A aplicação conseguiu se conectar ao banco de dados, mas as tabelas do Laravel ainda não foram criadas.

**Solução:** Rode as migrações do Laravel para criar o esquema do banco de dados.

**Passos:**

1.  **Executar Migrações:**
    ```bash
    # No diretório src/
    ./vendor/bin/sail artisan migrate
    ```

#### Problema: `service 'agilizando' is not running`

**Diagnóstico:** O Laravel Sail usa a variável `APP_SERVICE` no `.env` para saber qual serviço no `docker-compose.yml` ele deve interagir. Se o nome do serviço principal no `docker-compose.yml` é `laravel.test` e o `APP_SERVICE` no `.env` é `agilizando`, há um desalinhamento.

**Solução:** Alinhe `APP_SERVICE` com o nome do serviço.

**Passos:**

1.  **Atualizar `APP_SERVICE`:** No `src/.env`, altere `APP_SERVICE=agilizando` para `APP_SERVICE=laravel.test`.

---

## 5. Entendendo Volumes e Permissões

Problemas de permissão são uma das maiores fontes de dor de cabeça em ambientes Docker. Entender como o Docker lida com arquivos e permissões é crucial para evitar erros como "Permission denied".

### 5.1. Bind Mounts vs. Volumes Nomeados

*   **Bind Mounts (Ambiente de Desenvolvimento Local):** Quando você usa `volumes: - .:/var/www/html` no seu `docker-compose.yml`, você está criando um bind mount. Isso significa que o diretório do seu sistema operacional (`.`, o diretório `src/` do projeto) é montado diretamente dentro do contêiner (`/var/www/html`). As permissões de arquivo e diretório no seu **sistema operacional (host)** são as que prevalecem.
*   **Volumes Nomeados (Ambiente de Produção):** Volumes nomeados (ex: `sail-mysql`, `sail-redis`) são gerenciados pelo próprio Docker. Eles são mais isolados do sistema de arquivos do host e são ideais para persistência de dados em produção, pois o Docker gerencia o ciclo de vida e as permissões.

### 5.2. A Diretiva `user:` e o Mapeamento UID/GID

Contêineres Docker rodam processos com um usuário específico. Se esse usuário não tiver permissão para ler ou escrever em um arquivo ou diretório montado, você terá um erro de "Permission denied".

*   **`user: '${UID:-1000}:${GID:-1000}'`:** No `src/docker-compose.yml`, a diretiva `user:` no serviço `laravel.test` instrui o Docker a rodar os comandos dentro do contêiner com o ID de usuário (`UID`) e grupo (`GID`) passados pelas variáveis de ambiente. Se essas variáveis não estiverem definidas, ele usa `1000` como padrão (que é o UID/GID padrão para o primeiro usuário na maioria dos sistemas Linux).

    Para que isso funcione corretamente, você pode adicionar as seguintes linhas ao seu `src/.env`:

    ```dotenv
    # Em src/.env
    UID=$(id -u)
    GID=$(id -g)
    ```

    Isso garante que o usuário dentro do contêiner tenha o mesmo UID/GID do seu usuário no host, evitando problemas de permissão ao criar ou modificar arquivos.

### 5.3. Comandos para Correção de Permissões

Se você ainda encontrar problemas de permissão, pode ser necessário ajustar a propriedade e as permissões dos arquivos no seu sistema operacional.

```bash
# Na raiz do projeto (fora do diretório src/)
sudo chown -R $USER:$USER src
sudo chmod -R 775 src
```

*   `sudo chown -R $USER:$USER src`: Altera recursivamente o proprietário e o grupo de todos os arquivos e diretórios dentro de `src/` para o seu usuário atual.
*   `sudo chmod -R 775 src`: Altera recursivamente as permissões, concedendo ao proprietário e ao grupo permissão total (leitura, escrita, execução) e a outros apenas leitura e execução.

---

## 6. Integração com Traefik e Portainer

Para uma experiência de desenvolvimento local mais robusta e próxima da produção, é altamente recomendado integrar o Traefik como proxy reverso e o Portainer para gerenciamento visual dos seus contêineres.

### 6.1. Configurando o Traefik para Roteamento Local com SSL

O Traefik gerencia o roteamento de requisições e a emissão de certificados SSL automaticamente.

**Passos:**

1.  **Instalar `mkcert`:** Para gerar certificados SSL locais confiáveis.
    *   Siga as instruções em [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert).
    *   Gere os certificados para `agilizando.local.dev` e `*.local.dev`.

2.  **Configurar o Traefik:** Certifique-se de que seu `docker-compose.yml` principal (onde o Traefik e Portainer estão definidos, geralmente fora do diretório do projeto) tenha o Traefik configurado para usar a rede `web-local` e o `mkcert` para SSL.

3.  **Integrar o Laravel Sail ao Traefik:** No `src/docker-compose.yml`, o serviço `laravel.test` precisa das labels do Traefik e estar na rede `web-local`.

    **Exemplo de `src/docker-compose.yml` (serviço `laravel.test`):**

    ```yaml
        laravel.test:
            # ... (outras configurações) ...
            networks:
                - sail
                - web-local # Adicionado para comunicação com Traefik
            labels:
                - "traefik.enable=true"
                - "traefik.http.routers.agilizando.rule=Host(`agilizando.local.dev`)"
                - "traefik.http.routers.agilizando.entrypoints=websecure"
                - "traefik.http.routers.agilizando.tls=true"
                - "traefik.http.services.agilizando.loadbalancer.server.port=80"
                - "traefik.docker.network=web-local" # Importante para o Traefik descobrir o serviço
    ```

    *   `traefik.enable=true`: Habilita o Traefik para este serviço.
    *   `traefik.http.routers.agilizando.rule=Host(`agilizando.local.dev`)`: Define a regra de roteamento.
    *   `traefik.http.routers.agilizando.entrypoints=websecure`: Usa o ponto de entrada HTTPS do Traefik.
    *   `traefik.http.routers.agilizando.tls=true`: Habilita TLS para esta rota.
    *   `traefik.http.services.agilizando.loadbalancer.server.port=80`: O Traefik encaminhará o tráfego para a porta 80 do contêiner `laravel.test`.
    *   `traefik.docker.network=web-local`: Informa ao Traefik em qual rede ele deve procurar por este serviço.

### 6.2. Uso do Portainer para Gerenciamento Visual

O Portainer oferece uma interface gráfica para gerenciar seus contêineres, imagens, volumes e redes Docker.

**Passos:**

1.  **Instalar Portainer:** Siga as instruções oficiais para instalar o Portainer no seu ambiente Docker.
2.  **Acessar a Interface:** Após a instalação, acesse o Portainer no seu navegador (geralmente `http://localhost:9000` ou `https://localhost:9443`).
3.  **Visualizar e Gerenciar:** No Portainer, você pode:
    *   Ver todos os contêineres em execução.
    *   Inspecionar logs.
    *   Parar, iniciar, reiniciar contêineres.
    *   Gerenciar volumes e redes.

---