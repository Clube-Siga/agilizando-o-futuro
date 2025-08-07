# Plano de Ação: Migração e Modernização de Deploy

Este plano de ação detalha as tarefas necessárias para atingir os objetivos descritos no `CONTEXT.md`.

## Fase 1: Ambiente de Desenvolvimento Local

- [x] **1.1. Configurar a aplicação para rodar localmente.**
  - Utilizar Laravel Sail.
  - Integrar com a infraestrutura existente (Traefik, MySQL, Redis) via rede Docker externa.
  - Corrigir configurações do Nginx e `docker-compose.yml` para o ambiente local.

- [x] **1.2. Atualizar a aplicação Laravel.**
  - Fazer o upgrade do framework da versão 11 para a 12.
  - Rodar migrações e verificar a compatibilidade de dependências.

- [x] **1.3. Atualizar o frontend.**
  - Atualizar as dependências do `package.json`.
  - Compilar os assets e garantir que a interface funcione como esperado.

## Fase 2: Configuração de Produção e Deploy (CI/CD)

- [x] **2.1. Preparar o `docker-swarm-prod.yml` para produção.**
  - Implementar o uso de **Docker Secrets** para todas as credenciais (banco de dados, APIs, etc.).
  - Configurar **volumes nomeados** para a persistência de dados (banco de dados, arquivos de upload).

- [x] **2.2. Implementar o pipeline de CI/CD com GitHub Actions.**
  - Criar um workflow para buildar a imagem Docker da aplicação.
  - Fazer o push da imagem para o GitHub Container Registry (`ghcr.io`).
  - Criar um job de deploy que acessa a VPS via SSH e executa o `docker stack deploy` para atualizar a aplicação.
- [] **2.3. resolver erros impedindo a renderização**
  ACTION_PLAN: Migração e Modernização de Deploy
Este plano de ação está dividido em fases, começando pela resolução dos problemas mais urgentes e avançando para a implementação de boas práticas e a finalização da configuração.

Fase 1: Diagnóstico e Resolução de Erros Críticos
O objetivo desta fase é colocar a aplicação no ar, resolvendo os erros 403 Forbidden e de conexão com o banco de dados.

Checklist - Fase 1
[ ] 1.1. Corrigir o erro 403 Forbidden do Nginx

[ ] 1.2. Resolver o erro de conexão com o banco de dados (Name does not resolve)

[ ] 1.3. Validar as permissões de arquivos e pastas da aplicação

1.1. Corrigindo o erro 403 Forbidden
Este erro geralmente indica que o Nginx não tem permissão para acessar os arquivos da aplicação ou que a configuração do root está incorreta.

Análise:

Verifique o root do Nginx: A diretiva root no seu arquivo de configuração do Nginx (geralmente em /etc/nginx/conf.d/default.conf dentro do contêiner) deve apontar para o diretório public da sua aplicação Laravel. O caminho completo dentro do contêiner deve ser /var/www/app/public.

Use curl para um diagnóstico detalhado: Execute o comando curl -v https://agilizando.clubesiga.com.br/ no seu terminal local ou no servidor. A saída verbosa (-v) pode nos dar mais pistas sobre a origem do erro (redirecionamentos, problemas de certificado, etc.).

Ação Corretiva:

Ajuste a configuração do Nginx: Garanta que seu arquivo de configuração do Nginx contenha algo como:

Nginx

server {
    listen 80;
    server_name agilizando.clubesiga.com.br;
    root /var/www/app/public; # <-- Ponto crucial!

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock; # Verifique a versão do PHP
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
1.2. Resolvendo o erro de conexão com o banco de dados
O erro SQLSTATE[HY000] [2002] php_network_getaddresses: getaddrinfo for db-staging failed: Name does not resolve é um indicativo claro de que o contêiner da sua aplicação (agilizando-app) não consegue encontrar o serviço db-staging na rede.

Análise:

Conectividade de Rede no Docker Swarm: Para que os serviços se comuniquem pelo nome, eles precisam estar na mesma rede Docker.

Nome do Serviço: Confirme se o nome do serviço do MySQL é exatamente db-staging.

Ação Corretiva:

Conecte o serviço à rede staging: Ao fazer o deploy da sua stack, você precisa garantir que o serviço agilizando-app esteja conectado à rede staging existente.

No seu arquivo docker-compose.yml (ou similar para o deploy da stack), a configuração do seu serviço deve ser parecida com esta:

YAML

version: '3.8'

services:
  agilizando-app:
    image: sua-imagem-aqui # Substitua pela sua imagem
    # ... outras configurações ...
    networks:
      - staging # <-- Conecta o serviço à rede 'staging'

networks:
  staging:
    external: true # <-- Informa ao Docker que a rede já existe
Teste a Conexão: Após o deploy, acesse o contêiner da aplicação e teste a conexão:

Bash

# Acesse o contêiner (use o ID do seu contêiner)
ssh vps-clubesiga-webert "docker exec -it <ID_DO_CONTAINER> bash"

# Dentro do contêiner, tente pingar o serviço do banco
ping db-staging
Se o ping funcionar, o problema de resolução de nome está resolvido.

1.3. Validando as Permissões de Arquivos e Pastas
Permissões incorretas são uma causa comum de erros 403 e 500 no Laravel.

Análise:

Dono dos Arquivos: O usuário do servidor web (geralmente www-data) precisa ter permissão de leitura em todos os arquivos da aplicação e de escrita nos diretórios storage e bootstrap/cache.

Ação Corretiva:

Ajuste as Permissões: Acesse o contêiner da aplicação e execute os seguintes comandos:

Bash

# Acesse o contêiner
ssh vps-clubesiga-webert "docker exec -it <ID_DO_CONTAINER> bash"

# Dentro do contêiner, no diretório /var/www/app
chown -R www-data:www-data /var/www/app/storage /var/www/app/bootstrap/cache
chmod -R 775 /var/www/app/storage
chmod -R 775 /var/www/app/bootstrap/cache
Fase 2: Boas Práticas e Configurações de Produção
Com a aplicação no ar, vamos agora focar em segurança, automação e na implementação das melhores práticas para um ambiente de produção robusto.

Checklist - Fase 2
[ ] 2.1. Implementar Docker Secrets para credenciais

[ ] 2.2. Configurar os serviços de queue e schedule

[ ] 2.3. Configurar o fluxo de trabalho com Pull Requests no GitHub

2.1. Implementando Docker Secrets
A segurança das credenciais é inegociável. O uso de Docker Secrets é a abordagem correta.

Ação Corretiva:

Crie os Secrets no Docker Swarm:

Bash

# No seu servidor VPS
echo "sua_senha_do_banco" | docker secret create db_password -
echo "seu_usuario_do_banco" | docker secret create db_user -
# Crie secrets para outras credenciais (API keys, etc.)
Atualize o docker-compose.yml:

YAML

version: '3.8'

services:
  agilizando-app:
    image: sua-imagem-aqui
    # ...
    secrets:
      - db_password
      - db_user
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
      DB_USERNAME_FILE: /run/secrets/db_user
    # ...

secrets:
  db_password:
    external: true
  db_user:
    external: true
Ajuste a configuração do Laravel: No arquivo config/database.php, certifique-se de que o Laravel leia as credenciais a partir das variáveis de ambiente que apontam para os arquivos de secret.

2.2. Configurando queue e schedule
Para tarefas em background e agendadas, vamos criar serviços dedicados.

Ação Corretiva:

Adicione os serviços ao docker-compose.yml:

YAML

services:
  # ... seu serviço agilizando-app ...

  queue:
    image: sua-imagem-aqui
    command: php artisan queue:work
    networks:
      - staging
    volumes:
      - app-data:/var/www/app
    # ... outras configs ...

  schedule:
    image: sua-imagem-aqui
    command: cron -f # Ou um script que rode 'php artisan schedule:run' a cada minuto
    networks:
      - staging
    volumes:
      - app-data:/var/www/app
    # ... outras configs ...

volumes:
  app-data: # Volume nomeado para compartilhar o código
Importante: O uso de um volume nomeado (app-data) garante que todos os serviços (app, queue, schedule) utilizem a mesma base de código.

2.3. Configurando o Fluxo de Trabalho no GitHub
Para proteger a branch main, vamos configurar regras de proteção.

Ação Corretiva:

Acesse as Configurações do Repositório: No GitHub, vá em Settings > Branches.

Adicione uma Regra de Proteção:

Branch name pattern: main

Require a pull request before merging: Marque esta opção.

Require approvals: Defina o número de aprovações necessárias (pelo menos 1).

Dismiss stale pull request approvals when new commits are pushed: Recomendado.

Restrict who can push to matching branches: Se necessário, restrinja o push direto.

Próximos Passos Recomendados
Comece pela Fase 1. Resolva um problema de cada vez, validando as alterações a cada passo.

Use o ssh vps-clubesiga-webert para executar os comandos de diagnóstico e correção diretamente no ambiente de produção.

Mantenha este ACTION_PLAN atualizado. Marque os itens concluídos para acompanhar seu progresso.


## Fase 3: Governança e Boas Práticas

- [ ] **3.1. Implementar controle de acesso ao repositório.**
  - Configurar regras de proteção na branch `main` para exigir Pull Requests e revisões.

- [ ] **3.2. Manter a documentação e o plano de ação atualizados.**
  - O `ACTION_PLAN.md` deve ser o reflexo fiel do andamento do projeto.