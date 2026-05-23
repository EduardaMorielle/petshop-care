# 🐾 PetShop Care — Sistema de Gerenciamento

**Disciplina:** Desenvolvimento de Sistemas Web  
**Discente:** Eduarda Gabrielle Moraes dos Santos  
**Instituição:** UEA — CESIT  
**URL de produção:** http://petshop-care.cesit.uea.edu.br

---

## Problema

Petshops sem sistemas digitalizados perdem até 30% dos agendamentos por conflitos de horário e falhas de comunicação. O PetShop Care resolve isso com uma plataforma web completa para gerenciar clientes, pets, serviços e agendamentos.

## Solução

API RESTful com Spring Boot + SPA em Angular, com autenticação JWT, controle de acesso por perfil e deploy em Docker.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Back-end | Spring Boot 3.2, Spring Security, JPA |
| Banco de dados | MySQL 8.0 |
| Autenticação | JWT (jjwt 0.11.5) |
| Front-end | Angular 17, Angular Material |
| Deploy | Docker + Docker Compose |

---

## Funcionalidades

- Autenticação com JWT (login/registro)
- Controle de acesso por perfil (CLIENTE, ATENDENTE, ADMINISTRADOR)
- CRUD completo de Pets
- CRUD completo de Serviços (admin)
- Agendamento de serviços com validação de conflito
- Fluxo de atendimento: Agendado → Aguardando → Em Atendimento → Concluído
- Dashboard com estatísticas
- Interface responsiva com Angular Material

---

## Estrutura do Projeto

```
Projeto Final/
├── petshop-care-api/          # Back-end Spring Boot
│   ├── src/main/java/com/petshopcare/api/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── model/
│   │   ├── dto/
│   │   ├── security/
│   │   └── exception/
│   └── Dockerfile
├── petshop-care-frontend/     # Front-end Angular
│   ├── src/app/
│   │   ├── core/              # guards, interceptors, services, models
│   │   ├── layout/            # menu lateral
│   │   └── pages/             # login, dashboard, pets, servicos, agendamentos
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Como executar

### Pré-requisitos
- Docker e Docker Compose instalados

### Subir o projeto completo

```bash
docker-compose up --build
```

### Acessar

- **Front-end:** http://localhost
- **API:** http://localhost:8282
- **Swagger:** http://localhost:8282/swagger-ui.html

---

## Credenciais de teste

Crie usuários via `POST /api/auth/registrar`:

```json
{
  "nome": "Admin Teste",
  "email": "admin@petshop.com",
  "senha": "123456",
  "cpf": "12345678901",
  "perfil": "ADMINISTRADOR"
}
```

```json
{
  "nome": "Cliente Teste",
  "email": "cliente@petshop.com",
  "senha": "123456",
  "cpf": "98765432100",
  "perfil": "CLIENTE"
}
```

---

## Deploy no servidor UEA

```bash
# Acessar o servidor
ssh eduarda@172.25.1.60

# Clonar o repositório
git clone https://github.com/seu-usuario/petshop-care.git
cd petshop-care

# Subir os containers
docker-compose up -d --build
```

A aplicação ficará disponível em: **http://petshop-care.cesit.uea.edu.br**

---

## Endpoints principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/registrar | Criar usuário |
| POST | /api/auth/login | Login / obter token |
| GET | /api/pets/meus | Listar meus pets |
| POST | /api/pets | Cadastrar pet |
| PUT | /api/pets/{id} | Editar pet |
| DELETE | /api/pets/{id} | Remover pet |
| GET | /api/servicos | Listar serviços ativos |
| POST | /api/servicos | Criar serviço (admin) |
| POST | /api/agendamentos | Criar agendamento |
| GET | /api/agendamentos/meus | Meus agendamentos |
| PATCH | /api/agendamentos/{id}/chegada | Registrar chegada |
| PATCH | /api/agendamentos/{id}/iniciar | Iniciar atendimento |
| PATCH | /api/agendamentos/{id}/concluir | Concluir atendimento |
| PATCH | /api/agendamentos/{id}/cancelar | Cancelar agendamento |
