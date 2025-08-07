#!/bin/sh
# 'set -e' faz o script parar se algum comando falhar.
set -e

# --- ETAPA DE PREPARAÇÃO ---
# Esta parte é executada como 'root' para ter os poderes necessários.

echo "A preparar o ambiente do Laravel..."

# 1. Corrige o dono de todas as pastas que precisam de escrita.
#    Isto resolve o erro de permissão no 'storage' de uma vez por todas.
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 2. Limpa qualquer cache de configuração antigo que possa ter sido "cozido" na imagem.
#    Isto força o Laravel a ler o ficheiro .env fresco.
php artisan config:clear
php artisan route:clear

echo "Ambiente preparado com sucesso."

# --- ETAPA DE EXECUÇÃO ---
# 'exec gosu www-data "$@"' é a parte mais importante:
# Ele troca do utilizador 'root' para o utilizador 'www-data' (por segurança) e então
# executa o comando principal que foi passado para o contentor (o CMD do Dockerfile).
exec gosu www-data "$@"