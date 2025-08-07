# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Migrar a aplicação de uma VPS (Virtual Private Server) para uma nova infraestrutura, adotando práticas de deploy mais modernas, seguras e eficientes com Docker Swarm. e colocar a aplicação rodando no ambiente local de desenvolvimento

## 2. Requisitos e Desafios

### Segurança de Credenciais
O repositório do projeto será público para fins educacionais (compartilhado com alunos). É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente**, e não mais na VPS usar o sail.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres e bind mount localmente.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

## 3. Status Atual
- A configuração inicial do repositório no GitHub foi concluída.
- A chave SSH para acesso ao servidor de produção está configurada.
- O `git pull` para sincronização de arquivos está funcional.

## 4. Itens Pendentes (Ações Imediatas)
- resolver a renderização em produção, usar curl verboso para identificar erros 
https://agilizando.clubesiga.com.br/ 

pra rodar comandos na vps use ssh vps-clubesiga-webert se precisar 

# Dockerfile (Versão Otimizada e Final que funciona em produção usa como exemplo para ajustar o agilizando )
aplicação reside `/src`
# --- Stage 1: Backend Dependencies ---
FROM composer:2.8.10 AS vendor
WORKDIR /app
COPY app/composer.json app/composer.lock ./
RUN composer install --ignore-platform-reqs --no-interaction --no-dev --no-plugins --no-scripts --prefer-dist --optimize-autoloader

# --- Stage 2: Frontend Assets ---
FROM node:24-alpine3.21 AS frontend
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm ci
COPY app .
COPY --from=vendor /app/vendor/ ./vendor/
RUN npm run build

# --- Stage 3: The Final Production Image (PHP-FPM) ---
FROM php:8.4-fpm-alpine AS final

ARG user=www-data
ARG group=www-data
ARG APP_DIR=/var/www/app

# Instala dependências do sistema e extensões PHP
RUN apk update && apk add --no-cache \
    libpq libzip libpng libjpeg-turbo libwebp freetype oniguruma icu-libs bash curl redis \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS linux-headers \
    libzip-dev libjpeg-turbo-dev libpng-dev libwebp-dev freetype-dev \
    oniguruma-dev icu-dev postgresql-dev libxml2-dev && \
    docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp && \
    docker-php-ext-install -j$(nproc) gd intl pdo pdo_mysql pdo_pgsql pgsql session xml zip bcmath opcache mbstring exif pcntl sockets && \
    pecl install redis && docker-php-ext-enable redis && \
    apk del .build-deps && rm -rf /var/cache/apk/*

# Copia as configurações personalizadas de PHP
COPY docker/php/extra-php.ini /usr/local/etc/php/conf.d/zz-custom.ini
COPY docker/php/fpm-pool.conf /usr/local/etc/php-fpm.d/zz-fpm.conf

WORKDIR ${APP_DIR}

# Copia o código-fonte e os artefatos
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=vendor /app/vendor/ ./vendor/
COPY --from=frontend /app/public/ ./public/
COPY app/app ./app
COPY app/bootstrap ./bootstrap
COPY app/config ./config
COPY app/database ./database
COPY app/resources ./resources
COPY app/routes ./routes
COPY app/artisan . 
COPY app/composer.json . 
COPY app/composer.lock .

# CORREÇÃO: Cria a estrutura de diretórios do storage, incluindo o `storage/app/public`
RUN mkdir -p ${APP_DIR}/storage/app/public \
             ${APP_DIR}/storage/framework/sessions \
             ${APP_DIR}/storage/framework/views \
             ${APP_DIR}/storage/framework/cache \
             ${APP_DIR}/storage/logs

# Define as permissões corretas DURANTE O BUILD
RUN chown -R ${user}:${group} ${APP_DIR} && \
    chmod -R 775 ${APP_DIR}/storage ${APP_DIR}/bootstrap/cache

# A imagem será executada como 'www-data' por padrão
USER ${user}

EXPOSE 9000
CMD ["php-fpm"]

# --- Stage 4: The Final Nginx Image ---
FROM nginx:alpine AS nginx_production
WORKDIR /var/www/app/public
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/clubesiga-prod.conf /etc/nginx/conf.d/default.conf
COPY --from=final /var/www/app/public .

# ✅ SOLUÇÃO: Adiciona o link simbólico diretamente no estágio do Nginx.
# Este link ficará "quebrado" durante o build, mas funcionará perfeitamente
# em tempo de execução quando o volume do storage for montado.
# ✅ SOLUÇÃO: Remove a pasta 'storage' vazia e cria o link simbólico correto no lugar dela.
RUN rm -rf /var/www/app/public/storage && \
    ln -s /var/www/app/storage/app/public /var/www/app/public/storage

# Exemplo que funciona em produção de configuração nginx
server {
    listen   80; ## listen for ipv4; this line is default and implied
    # listen   [::]:80 default ipv6only=on; ## listen for ipv6

    server_name app.clubesiga.com.br;

    root /var/www/app/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    large_client_header_buffers 4 32k;
    client_max_body_size 100M;
    resolver 127.0.0.11 valid=30s;

    index index.php index.html index.htm;
    charset utf-8;

    # Logs personalizados (ajuste os caminhos se necessário)
    error_log /var/log/nginx/clubesiga_app_error.log;
    access_log /var/log/nginx/clubesiga_app_access.log;

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass app:9000; 
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_read_timeout 300;
    }

    location /storage {
        root /var/www/app/public;
        autoindex off;
    }
    
    location ~ /\.(?!well-known).* {
        deny all;
    }

    location ~* \.(env|log|ini|sh|bak|sql)$ {
        deny all;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|ttc|otf|webp|mp4|mov|ogg|ogv|webm|zip|rar|tar|gz|bz2|7z)$ {
        expires max;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
}

# exemplo da stack que funciona
#dock-swarm-prod.yml
version: "3.8"

services:
  # --- Banco de Dados (MySQL) ---
  db:
    image: mysql:8.0
    #precisam ser declaradas as secrets
    secrets:
    - source: mysql_root_password
      target: mysql_root_password
    - source: db_username
      target: db_username
    - source: db_password
      target: db_password
    - source: app_clubesiga_db
      target: app_clubesiga_db
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    environment:
      MYSQL_DATABASE_FILE: /run/secrets/app_clubesiga_db
      MYSQL_USER_FILE: /run/secrets/db_username
      MYSQL_PASSWORD_FILE: /run/secrets/db_password
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
    volumes:
      - db_clubesiga:/var/lib/mysql
     # - ./docker/mysql/my.cnf:/etc/mysql/my.cnf
    networks:
      - clubesiga
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -p$$(cat /run/secrets/db_password)"]
      retries: 3
      timeout: 5s
    command: ["mysqld", "--bind-address=0.0.0.0"]

  # --- Redis ---
  redis:
    image: redis:alpine
    hostname: redis
    env_file: [".env.production"]
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    volumes:
      - redis_data_prod:/data
    networks:
      - clubesiga
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  # --- Aplicação Laravel (PHP-FPM) ---
  app:
    image: ${APP_IMAGE_TAG:-ghcr.io/webertmaximiano/clubesiga-app:production}
    env_file: [".env.production"]
    secrets:
      - app_key_prod
      - db_username
      - db_password
      - app_clubesiga_db

    user: "82"
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    volumes:
      - app_storage_prod:/var/www/app/storage
    networks:
      - clubesiga
    command: php-fpm

  # --- Servidor Web (Nginx) ---
  nginx:
    image: ${APP_IMAGE_NGINX_TAG:-ghcr.io/webertmaximiano/clubesiga-nginx:production}
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    volumes:
      - app_logs_prod:/var/log/nginx
      - app_storage_prod:/var/www/app/storage:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nginx.rule=Host(`app.clubesiga.com.br`)"
      - "traefik.http.routers.nginx.entrypoints=websecure"
      - "traefik.http.routers.nginx.tls.certresolver=leresolver"
      - "traefik.http.services.nginx.loadbalancer.server.port=80"
    networks:
      - clubesiga
      - web

  # --- Agendador de Tarefas (Scheduler) ---
  scheduler:
    image: ${APP_IMAGE_TAG:-ghcr.io/webertmaximiano/clubesiga-app:production}
    env_file: [".env.production"]
    secrets:
      - app_key_prod
      - db_username
      - db_password
      - app_clubesiga_db

    user: "82"
    command: sh -c "while true; do php /var/www/app/artisan schedule:run; sleep 60; done"
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    volumes:
      - app_storage_prod:/var/www/app/storage
    networks:
      - clubesiga

  # --- Filas (Queue Worker / Horizon) ---
  queue:
    image: ${APP_IMAGE_TAG:-ghcr.io/webertmaximiano/clubesiga-app:production}
    env_file: [".env.production"]
    secrets:
      - app_key_prod
      - db_username
      - db_password
      - app_clubesiga_db

    user: "82"
    command: php artisan horizon
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    volumes:
      - app_storage_prod:/var/www/app/storage
    networks:
      - clubesiga
    healthcheck:
      test: ["CMD", "php", "artisan", "horizon:status"]
      interval: 60s
      timeout: 10s
      retries: 3
      start_period: 30s

volumes:
  app_logs_prod:
    external: true
  app_storage_prod:
    external: true
  db_clubesiga:
    external: true
  redis_data_prod:
    external: true

networks:
  clubesiga:
    external: true
  web:
    external: true

secrets:
  app_key_prod:
    external: true
  mysql_root_password:
    external: true
  db_username:
    external: true
  db_password:
    external: true
  app_clubesiga_db:
    external: trues