# Plano de Ação: Migração e Modernização de Deploy

Este plano de ação detalha as tarefas necessárias para atingir os objetivos descritos no `CONTEXT.md`.

## Fase 1: Ambiente de Desenvolvimento Local

- [x] **1.1. Configurar a aplicação para rodar localmente.**
  - Utilizar Laravel Sail.
  - Integrar com a infraestrutura existente (Traefik, MySQL, Redis) via rede Docker externa.
  - Corrigir configurações do Nginx e `docker-compose.yml` para o ambiente local.

- [x] **1.2. Atualizar a aplicação Laravel.**
  - Fazer o upgrade do framework da versão 11 para a 12.
  - Rodar migrações e verificar a compatibilidade de dependências.

- [x] **1.3. Atualizar o frontend.**
  - Atualizar as dependências do `package.json`.
  - Compilar os assets e garantir que a interface funcione como esperado.

## Fase 2: Configuração de Produção e Deploy (CI/CD)

- [x] **2.1. Preparar o `docker-swarm-prod.yml` para produção.**
  - Implementar o uso de **Docker Secrets** para todas as credenciais (banco de dados, APIs, etc.).
  - Configurar **volumes nomeados** para a persistência de dados (banco de dados, arquivos de upload).

- [x] **2.2. Implementar o pipeline de CI/CD com GitHub Actions.**
  - Criar um workflow para buildar a imagem Docker da aplicação.
  - Fazer o push da imagem para o GitHub Container Registry (`ghcr.io`).
  - Criar um job de deploy que acessa a VPS via SSH e executa o `docker stack deploy` para atualizar a aplicação.
- [x] **2.3. Resolver erros impedindo a renderização em produção.**
  - Corrigir erro de JavaScript (`ReferenceError: submit is not defined`).
  - Corrigir erro de conexão com o banco de dados (`Name does not resolve`).

## Fase 3: Governança, Boas Práticas e Formação (Turma 02)

- [x] **3.1. Criar a Documentação do repositório como guia de formação.**
  - Criar a pasta `docs/` com `overview-agile-team-one.md`.
  - Documentar a jornada da Turma 01 (Fase 1 e 2).
  - **Implementar metodologia de ensino por Sprints e TDD para a Turma 02.**
    - [x] **Sprint 01:** Fundamentos de Testes e TDD - Autenticação.
    - [x] **Sprint 02:** TDD na Prática - Funcionalidade de Registro.
    - [x] **Sprint 03:** TDD e Segurança - Corrigindo Vulnerabilidades NPM.
    - [x] **Sprint 04:** TDD e Mocking - Testando Serviços Externos (RecaptchaService).
    - [x] **Sprint 05:** TDD e Integração com IA (Gemini CLI).
    - [x] **Sprint 06:** Gerenciamento Seguro de Credenciais com Docker Secrets.
  - [x] **Configurar ambiente de testes local:** SQLite em memória, permissões de arquivo.
  - [x] **Corrigir testes existentes:** `RecaptchaServiceTest`, `RegistrationTest`.
  - [x] **Atualizar `README.md`** para refletir a nova estrutura de Sprints.
  - [x] **Alterar link de clone do repositório** para HTTPS na documentação.

## Fase 4: Análise e Documentação do Legado (Turma 01 e 02) - Concluída

- [x] **4.1. Análise do Código Fonte.**
  - [x] Mapear todas as rotas existentes em `src/routes/web.php`.
  - [x] Listar os `Controllers` e seus respectivos métodos em `src/app/Http/Controllers`.
  - [x] Listar os `Models` em `src/app/Models` e identificar seus relacionamentos.
  - [x] Analisar os `Requests` em `src/app/Http/Requests` para entender as regras de validação.
  - [x] Revisar os testes em `src/tests/` para verificar a cobertura das funcionalidades existentes.

- [x] **4.2. Criação do Backlog de Documentação.**
  - [x] Com base na análise, criar um arquivo `docs/turma-02/00-analise-tecnica-overview.md` com o resumo da análise.
  - [x] Criar um arquivo `docs/turma-02/backlog.md` com a lista de funcionalidades a serem documentadas como aulas.

## Fase 5: Documentação Avançada e Infraestrutura

- [ ] **5.1. Criar Sprint 09: Fila de E-mails com Redis**
    - [ ] **Objetivo:** Ensinar como usar o `Queue` do Laravel com Redis para envio de e-mails de forma assíncrona.
    - [ ] **Tópicos:**
        - [ ] Configuração do `QUEUE_CONNECTION` para Redis.
        - [ ] Criação de um `Job` para o envio do e-mail de contato.
        - [ ] Despachando o Job no `ContactService`.
        - [ ] Configurando o serviço do `worker` no `docker-swarm-prod.yml`.
- [ ] **5.2. Criar Sprint 10: Agendamento de Tarefas com `schedule`**
    - [ ] **Objetivo:** Ensinar como usar o `Task Scheduling` do Laravel.
    - [ ] **Tópicos:**
        - [ ] Configurando o `schedule` no `app/Console/Kernel.php`.
        - [ ] Criando um comando de exemplo.
        - [ ] Adicionando o `cron` para executar o `schedule:run`.
- [ ] **5.3. Criar Sprint 11: Boas Práticas de DevOps - Pull Requests**
    - [ ] **Objetivo:** Ensinar o fluxo de trabalho com Pull Requests.
    - [ ] **Tópicos:**
        - [ ] Configurando `branch protection rules` no GitHub.
        - [ ] Exigindo revisão de código.
        - [ ] Exigindo a passagem dos testes (GitHub Actions) antes do merge.
- [ ] **5.4. Revisar e Documentar Volumes e Permissões**
    - [ ] **Objetivo:** Criar um documento explicando a estratégia de volumes e as permissões de arquivos em produção.
