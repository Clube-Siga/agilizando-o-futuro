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

- [x] **5.1. Criar Sprint 09: Fila de E-mails com Redis**
    - [x] **Objetivo:** Ensinar como usar o `Queue` do Laravel com Redis para envio de e-mails de forma assíncrona.
    - [x] **Tópicos:**
        - [x] Configuração do `QUEUE_CONNECTION` para Redis.
        - [x] Criação de um `Job` para o envio do e-mail de contato.
        - [x] Despachando o Job no `ContactService`.
        - [x] Configurando o serviço do `worker` no `docker-swarm-prod.yml`.
- [x] **5.2. Criar Sprint 10: Agendamento de Tarefas com `schedule`**
    - [x] **Objetivo:** Ensinar como usar o `Task Scheduling` do Laravel.
    - [x] **Tópicos:**
        - [x] Configurando o `schedule` no `app/Console/Kernel.php`.
        - [x] Criando um comando de exemplo.
        - [x] Adicionando o `cron` para executar o `schedule:run`.
- [x] **5.3. Criar Sprint 11: Depurando Conectividade e Variáveis de Ambiente em Docker Swarm**
    - [x] **Objetivo:** Ensinar técnicas de depuração para problemas de conectividade de rede e interpretação de variáveis de ambiente em ambientes Docker Swarm.
    - [x] **Tópicos:**
        - [x] Service Discovery no Docker Swarm.
        - [x] Resolução de DNS vs. Interpretação de Variáveis de Ambiente.
        - [x] Precisão em Arquivos `.env`.
        - [x] Técnicas de Depuração (ping, rota de debug).
- [x] **5.4. Revisar e Documentar Volumes e Permissões**
    - [x] **Objetivo:** Criar um documento explicando a estratégia de volumes e as permissões de arquivos em produção.
- [x] **5.5. Criar Sprint 13: Health Checks para Contêineres em Docker Swarm**
    - [x] **Objetivo:** Ensinar a importância e como implementar health checks em contêineres Docker, permitindo que o Swarm monitore a saúde dos serviços e reaja a falhas.
    - [x] **Tópicos:**
        - [x] O que são Health Checks e por que são importantes.
        - [x] Tipos de Health Checks (CMD, CMD-SHELL, HTTP).
        - [x] Parâmetros de configuração (`interval`, `timeout`, `retries`, `start_period`).
        - [x] Implementando Health Checks no `Dockerfile` e no `docker-swarm.yml`.
- [x] **5.6. Criar Sprint 14: Introdução ao Gemini CLI e Modelos de IA**
    - [x] **Objetivo:** Ensinar como instalar, configurar e fazer chamadas básicas usando o Gemini CLI, e como escolher o modelo de IA mais adequado para a tarefa.
    - [x] **Tópicos:**
        - [x] Instalação e configuração do Gemini CLI.
        - [x] Autenticação e gerenciamento de chaves de API.
        - [x] Seleção de Modelos (`gemini-pro`, `gemini-pro-vision`).
        - [x] Comandos básicos para geração de conteúdo (`gemini generate-content`).
        - [x] Interpretação da saída do CLI (texto puro, JSON).
- [x] **5.7. Criar Sprint 15: Engenharia de Prompt Avançada e Parâmetros de Geração do Gemini**
    - [x] **Objetivo:** Aprofundar nas técnicas de engenharia de prompt, focando em como formular instruções complexas e utilizar os parâmetros de geração específicos do Gemini para obter respostas mais precisas, controladas e úteis.
    - [x] **Tópicos:**
        - [x] Estratégias de Prompt (role-playing, few-shot prompting, chain-of-thought, persona definition).
        - [x] Parâmetros de Geração (`temperature`, `top_p`, `top_k`).
        - [x] Saída Estruturada (JSON, YAML, XML).
        - [x] Gerenciamento de Contexto (conversas multi-turn).
- [x] **5.8. Criar Sprint 16: Boas Práticas, Guardrails e Casos de Uso Específicos com Gemini**
    - [x] **Objetivo:** Abordar os aspectos críticos da integração responsável de IA, incluindo segurança, ética, otimização de custos e tratamento de limites.
    - [x] **Tópicos:**
        - [x] Filtros de Segurança do Gemini.
        - [x] Otimização de Custos e Limites de Taxa.
        - [x] Iteração e Refinamento.
        - [x] Casos de Uso para Engenheiros de Software.

**Nota:** Para garantir a funcionalidade imediata do worker, `CACHE_STORE`, `SESSION_DRIVER` e `QUEUE_CONNECTION` estão sendo configurados via variáveis de ambiente diretamente no `docker-swarm-prod.yml`. O gerenciamento avançado dessas configurações via Docker Secrets será revisitado em uma sprint futura, após a estabilização do ambiente.