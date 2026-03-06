<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    // Adicione os links do seu Codespaces aqui
    'allowed_origins' => [
        'http://localhost:4200',
        'http://localhost:8000',
        'http://localhost:5432'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Mude para true se estiver usando autenticação
];