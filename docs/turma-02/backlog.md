# Backlog de Aulas e Funcionalidades - Turma 02

Este documento representa o backlog do nosso produto educacional. Cada item aqui é uma potencial aula ou uma série de aulas, combinando teoria e prática. A ordem representa a prioridade sugerida para o desenvolvimento do curso.

## Épico 1: Fundamentos e Funcionalidades Essenciais

*Este épico foca em completar as funcionalidades básicas da aplicação que foram identificadas como pendentes na análise técnica.*

- **[ ] Aula: Implementando Páginas de Conteúdo Estático**
  - **Tarefa:** Desenvolver a view para a página "Termos de Acordo".
  - **Tarefa:** Desenvolver a view para a página "Políticas de Privacidade".
  - **Conceitos:** Roteamento, Views com Inertia.js, Componentes de UI.

- **[ ] Aula: O Fluxo Completo do Formulário de Contato**
  - **Tarefa:** Documentar passo a passo o que acontece quando um usuário envia o formulário.
  - **Conceitos:** Validação com Form Requests, Arquitetura com Services, Desacoplamento com Events & Listeners, Envio de E-mails.

- **[ ] Aula: Integração Segura com APIs Externas (Google reCAPTCHA)**
  - **Tarefa:** Explicar como o `RecaptchaService` funciona.
  - **Tarefa:** Demonstrar o teste da integração usando Mocking (`Http::fake()`).
  - **Conceitos:** Consumo de APIs, Variáveis de ambiente, Testes de Integração.

## Épico 2: Sistema de Usuários e Controle de Acesso

*Este épico aprofunda no sistema de autenticação e na poderosa biblioteca `spatie/laravel-permission`.*

- **[ ] Aula: Roles & Permissions - O Guia Definitivo com Spatie**
  - **Tarefa:** Explicar a estrutura de tabelas criada pelo pacote Spatie.
  - **Tarefa:** Demonstrar como criar e atribuir Roles e Permissions.
  - **Tarefa:** Refatorar o `DashboardController` para usar o middleware do Spatie (ex: `middleware('role:Admin')`).
  - **Conceitos:** Controle de Acesso Baseado em Funções (RBAC), Middlewares.

- **[ ] Aula: Construindo Dashboards por Perfil de Usuário**
  - **Tarefa:** Desenvolver a view da `Dashboard/DashAdmin`.
  - **Tarefa:** Desenvolver a view da `Dashboard/DashStudent`.
  - **Tarefa:** Desenvolver a view da `Dashboard/DashTeacher`.
  - **Conceitos:** Componentes de frontend (Vue/React), Roteamento de frontend, Consumo de dados da API.

## Épico 3: Tópicos Avançados e Boas Práticas

*Este épico aborda conceitos que elevam a qualidade e a manutenibilidade do projeto.*

- **[ ] Aula: Refatoração e Código Limpo**
  - **Tarefa:** Analisar o `ContactController` e discutir possíveis melhorias.
  - **Tarefa:** Corrigir a inconsistência entre `ip_address` e `remoteIp` no `Contact`.
  - **Conceitos:** Code Smells, Princípios SOLID, Refatoração segura.

- **[ ] Aula: Tarefas em Segundo Plano com Queues**
  - **Tarefa:** Avaliar a necessidade de mover o envio de e-mail do contato para uma Queue.
  - **Tarefa:** Implementar um driver de Queue (ex: database ou Redis).
  - **Conceitos:** Processamento assíncrono, Workers, Jobs.
