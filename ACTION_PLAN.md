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
  - [x] **Configurar ambiente de testes local:** SQLite em memória, permissões de arquivo.
  - [x] **Corrigir testes existentes:** `RecaptchaServiceTest`, `RegistrationTest`.
  - [x] **Atualizar `README.md`** para refletir a nova estrutura de Sprints.
  - [x] **Alterar link de clone do repositório** para HTTPS na documentação.

- [ ] **3.2. Implementar controle de acesso ao repositório.**
  - Configurar regras de proteção na branch `main` para exigir Pull Requests e revisões.

- [ ] **3.3. Manter a documentação e o plano de ação atualizados.**
  - O `ACTION_PLAN.md` deve ser o reflexo fiel do andamento do projeto.

- [ ] **3.4. Avaliar e implementar Docker Secrets em produção.**
  - Garantir que todas as credenciais sensíveis estejam sendo gerenciadas via Docker Secrets.

- [ ] **3.5. Analisar e otimizar a montagem de volumes e permissões em produção.**
  - Verificar se os volumes estão sendo montados corretamente e se as permissões estão adequadas para o usuário do contêiner.

- [ ] **3.6. Avaliar a necessidade e implementar serviços de `queue` e `schedule` em produção.**
  - Verificar se a aplicação utiliza esses serviços e configurá-los no Docker Swarm, se necessário.
