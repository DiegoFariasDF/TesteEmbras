# Sistema de Gerenciamento de Publicidades

Projeto desenvolvido como teste técnico para gerenciamento de publicidades vinculadas a múltiplos estados.

O sistema permite criar, editar, listar e apagar publicidades, incluindo upload de imagem e controle de vigência.

## Tecnologias Utilizadas

- Laravel (PHP) — Backend e API REST
- Angular — Frontend da aplicação
- Docker — Containerização e execução do ambiente
- PostgreSQL — Banco de dados

---

# Funcionalidades

## Publicidades
- Cadastro de publicidades, com upload de imagem, podendo possuir associação com um ou mais estados
- Listagem com:
  * título
  * imagem
  * estados vinculados
  * período de vigência
- Edição de publicidade
- Exclusão de publicidade

## Estados
- Cadastro de estados
- Campos:
  - descrição
  - sigla

## Relacionamento
Uma publicidade pode estar vinculada a **um ou mais estados**, através da tabela de associação.

---

# Estrutura do Projeto

TesteEmbras
├── backend (Laravel API)
├── frontend (Angular)
├── docker
├── docker-compose.yml

---
# Pré-requisitos

Antes de executar o projeto é necessário ter instalado:

- Docker
- Git

---

# Como executar o projeto

Clonar o repositório
    git clone https://github.com/DiegoFariasDF/TesteEmbras.git

Antes de subir os containers, é necessário criar o arquivo `.env` para o backend Laravel, copiando as configurações disponibilizado no arquivo .env.example:
Entrar na pasta
    cd TesteEmbras/backend
    cp .env.example .env



Subir os containers
    docker-compose up 
    
    Esse comando irá iniciar: Backend Laravel, Frontend Angular, Banco PostgreSQL

Acessos:
Frontend: http://localhost:4200
Backend: http://localhost:8000


API Endpoints:

Publicidades
    GET /publicidades ou GET /publicidades/{id}
    POST /publicidades
    PUT /publicidades/{id}
    DELETE /publicidades/{id}

Estados
    GET /estados ou GET /estados/{id}
    POST /estados
    PUT /estados/{id}
    DELETE /estados/{id}

Essa é a tela principal do sistema. Aqui o usuário consegue visualizar todas as publicidades cadastradas com suas informações principais: título, imagem, estados vinculados e período de vigência.
O usuário tambem pode utilizar os filtros por estado, ou nome.
<img width="1360" height="732" alt="image" src="https://github.com/user-attachments/assets/767dff74-7cde-4c7e-9158-fea9ac47028a" />
