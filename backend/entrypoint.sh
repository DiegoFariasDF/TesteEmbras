#!/bin/sh

echo "Instalando dependências do Composer..."
composer install

echo "Gerando APP_KEY..."
php artisan key:generate --force

echo "Criando link do storage..."
php artisan storage:link || true

echo "Rodando migrations..."
php artisan migrate --force

echo "Iniciando servidor Laravel..."
php artisan serve --host=0.0.0.0 --port=8000