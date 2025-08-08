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
- [x] **2.3. resolver erros impedindo a renderização**
  ACTION_PLAN: Migração e Modernização de Deploy

## Fase 3: Governança e Boas Práticas


- [ ] **3.1. Criar a Documentação do repositório.**
  

- [ ] **3.2. Implementar controle de acesso ao repositório.**
  - Configurar regras de proteção na branch `main` para exigir Pull Requests e revisões.

- [ ] **3.3. Manter a documentação e o plano de ação atualizados.**
  - O `ACTION_PLAN.md` deve ser o reflexo fiel do andamento do projeto.