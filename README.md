# 📝 To-Do List com Laravel, React e Inertia.js

Uma aplicação simples de cadastro e listagem de tarefas (To-Do List), com autenticação de usuários, utilizando:

- **Backend**: Laravel 12 + PostgreSQL  
- **Frontend**: ReactJS + InertiaJS  
- **Infraestrutura**: Docker

---

## ✅ Especificações

### 1. Funcionalidades

#### Autenticação
- Registro de novos usuários com validações.
- Login e logout de usuários.
- Proteção de rotas para usuários autenticados.

#### CRUD de Tarefas
- **Criar nova tarefa com os seguintes campos:**
  - Título (obrigatório)
  - Descrição (obrigatório)
  - Status: `Aberta` ou `Concluída` (padrão: Aberta)
  - Data de vencimento (opcional)
- **Listar tarefas**:
  - Exibir apenas tarefas do usuário autenticado.
- **Editar tarefas**:
  - Atualização de título, descrição, status e data de vencimento.
- **Excluir tarefas**
- **Filtros opcionais**:
  - Por status (`Aberta`, `Concluída`)
  - Por data de vencimento

---

## ⚙️ Requisitos Técnicos

- Laravel 12
- PostgreSQL
- Docker + Docker Compose
- ReactJS com InertiaJS
- Migrations e Seeders obrigatórios para setup inicial

---

## 📦 Configurando Ambiente

### Instalando Docker
Siga o tutorial de instalação da documentação do [Docker](https://docs.docker.com/get-docker/) selecionando o seu sistema operacional.

### Baixando repositório e instalando dependencias
1. `git clone git@github.com:LuanAmaro/todo-list.git`
2. `cd todo-list`

#### Copie as váriaveis de ambiente
3. `cp .env.example .env`

### Instalar as dependencias do package
4. `npm install --force`
5. `npm run dev`

#### Inicie o servidor Docker
6. `docker-compose up -d`

#### Acesse o container
7. `docker exec -it todo-list-php bash`

#### Instale as dependencias
8. `composer install` ou `composer update`

#### Inicie as migrations e seeds
9. `php artisan migrate` ou `php artisan migrate --seed`

#### Gere uma chave para o projeto
10. `php artisan key:generate`

<br>

---
## Abre o navegador
 - Digite URL http://localhost

### Informe e-mail e senha.
E-mail: admin@demo.com <br>
Senha: 123456
