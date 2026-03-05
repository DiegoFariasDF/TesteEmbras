<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    // Adicione os links do seu Codespaces aqui
    'allowed_origins' => [
        'https://refactored-fortnight-v7p76vq6vvjh6pxq-4200.app.github.dev',
        'https://refactored-fortnight-v7p76vq6vvjh6pxq-8000.app.github.dev',
        'https://refactored-fortnight-v7p76vq6vvjh6pxq-5432.app.github.dev'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Mude para true se estiver usando autenticação
];