# Dockerfile adaptado para o projeto 'agilizando' com a estrutura src/

# --- Stage 1: Backend Dependencies ---
FROM composer:2.8.10 AS vendor
WORKDIR /app
# CORREÇÃO: Aponta para a pasta 'src'
COPY src/composer.json src/composer.lock ./
RUN composer install --ignore-platform-reqs --no-interaction --no-dev --no-plugins --no-scripts --prefer-dist --optimize-autoloader

# --- Stage 2: Frontend Assets ---
FROM node:24-alpine3.21 AS frontend
WORKDIR /app
# CORREÇÃO: Aponta para a pasta 'src'
COPY src/package.json src/package-lock.json ./
RUN npm ci
# CORREÇÃO: Aponta para a pasta 'src'
COPY src/ .
COPY --from=vendor /app/vendor/ ./vendor/
RUN npm run build

# --- Stage 3: The Final Production Image (PHP-FPM) ---
FROM php:8.4-fpm-alpine AS final

ARG user=www-data
ARG group=www-data
ARG APP_DIR=/var/www/app

# Instala dependências do sistema e extensões PHP (Lógica mantida do modelo)
RUN apk update && apk add --no-cache \
    libpq libzip libpng libjpeg-turbo libwebp freetype oniguruma icu-libs bash curl redis cronie \
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
# CORREÇÃO: Copia explicitamente cada pasta e ficheiro a partir de 'src/'
COPY src/app ./app
COPY src/bootstrap ./bootstrap
COPY src/config ./config
COPY src/database ./database
COPY src/resources ./resources
COPY src/routes ./routes
COPY src/artisan .
COPY src/composer.json .
COPY src/composer.lock .

# Cria a estrutura de diretórios do storage
RUN mkdir -p ${APP_DIR}/storage/app/public \
             ${APP_DIR}/storage/framework/sessions \
             ${APP_DIR}/storage/framework/views \
             ${APP_DIR}/storage/framework/cache \
             ${APP_DIR}/storage/logs

# Define as permissões corretas DURANTE O BUILD
RUN chown -R ${user}:${group} ${APP_DIR} && \
    chmod -R 775 ${APP_DIR}/storage ${APP_DIR}/bootstrap/cache

USER ${user}

EXPOSE 9000
CMD ["php-fpm"]

# --- Stage 4: The Final Nginx Image ---
FROM nginx:alpine AS nginx_production
WORKDIR /var/www/app/public
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/agilizando-production.conf /etc/nginx/conf.d/default.conf 
COPY --from=final /var/www/app/public .

#ajuste de permissões
RUN chmod -R 755 /var/www/app

# Cria o link simbólico para o storage
RUN rm -rf /var/www/app/public/storage && \
    ln -s /var/www/app/storage/app/public /var/www/app/public/storage
