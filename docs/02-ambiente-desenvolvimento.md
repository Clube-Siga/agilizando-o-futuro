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
    git clone git@github.com:Clube-Siga/agilizando-o-futuro.git
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

## 4. (Avançado) Domínio Virtual com SSL

Para uma experiência ainda mais próxima da produção, você pode configurar um domínio local (como `agilizando.test`) com um certificado SSL válido. Isso é útil para testar funcionalidades que exigem HTTPS.

*   **Ferramentas:** Você precisará de um servidor web local (Nginx ou Apache) e da ferramenta [mkcert](https://github.com/FiloSottile/mkcert).
*   **Processo:** O processo envolve gerar um certificado local com `mkcert` e configurar seu servidor web para usar esse certificado e apontar o domínio `.test` para o diretório `public` do seu projeto Laravel.

Este passo é opcional, mas altamente recomendado para quem deseja seguir uma carreira profissional em desenvolvimento web.

---

*Próximo capítulo: [O Esqueleto - Arquitetura de Software](./03-arquitetura-de-software.md)*
