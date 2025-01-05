# Usar a imagem base do PHP-FPM
FROM php:8.3-fpm

# Diretório da aplicação
ARG APP_DIR=/var/www/src

# Instalar pacotes do sistema necessários para extensões PHP
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    libjpeg-dev \
    libpng-dev \
    libwebp-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libxpm-dev \
    zlib1g-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    g++ \
    imagemagick \
    libmagickwand-dev \
    libmagickcore-dev \
    curl

# Instalar as extensões PHP necessárias
RUN docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp \
    && docker-php-ext-install \
    gd \
    intl \
    mysqli \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    session \
    xml \
    zip \
    bcmath \
    opcache \
    mbstring \
    exif \
    pcntl \
    fileinfo

# Instalar Redis via PECL
RUN pecl install redis && docker-php-ext-enable redis

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir o diretório de trabalho
WORKDIR ${APP_DIR}

# Copiar arquivos da aplicação
COPY ./src ${APP_DIR}

# Instalar dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões
RUN chown -R www-data:www-data ${APP_DIR}/storage ${APP_DIR}/bootstrap/cache

# Expor a porta do PHP-FPM
EXPOSE 9000

# Comando de inicialização do PHP-FPM
CMD ["php-fpm"]