# Plano de Ação: Migração e Modernização de Deploy

## Fase 1: Configuração do Ambiente de Desenvolvimento Local

- [ ] **1.1.** Revisar e ajustar o arquivo `docker-swarm-dev.yml` para operar localmente.
  - [ ] Remover dependências da VPS.
  - [ ] Configurar volumes para desenvolvimento.
  - [ ] Garantir que a aplicação suba localmente com `docker stack deploy`.
- [ ] **1.2.** Documentar o processo de setup do ambiente de desenvolvimento no `README.md`.

## Fase 2: Segurança e Configuração de Produção

- [ ] **2.1.** Implementar Docker Secrets para todas as credenciais.
  - [ ] Identificar todas as variáveis de ambiente e arquivos sensíveis.
  - [ ] Criar os secrets no Docker Swarm de produção.
- [ ] **2.2.** Ajustar o `docker-swarm-prod.yml`.
  - [ ] Substituir variáveis de ambiente por referências aos Docker Secrets.
  - [ ] Configurar volumes nomeados para persistência de dados (banco de dados, uploads, etc.).
- [ ] **2.3.** Validar o deploy em produção com as novas configurações.

## Fase 3: Automação de Deploy (CI/CD)

- [ ] **3.1.** Modificar o workflow do GitHub Actions (`.github/workflows/main.yml`).
  - [ ] Criar um job para build e push da imagem Docker para um registry (Docker Hub, GitHub Packages, etc.).
  - [ ] Criar um job para deploy em produção que se conecta ao servidor via SSH e executa `docker stack deploy`.
  - [ ] Garantir que os secrets do GitHub Actions (como a chave SSH e tokens) estejam sendo usados corretamente.

## Fase 4: Controle de Acesso ao Repositório

- [ ] **4.1.** Configurar regras de proteção (branch protection rules) para a branch `main`.
  - [ ] Exigir Pull Requests para merges em `main`.
  - [ ] Exigir pelo menos uma aprovação de um revisor.
  - [ ] (Opcional) Exigir que os checks de status (CI) passem antes do merge.
- [ ] **4.2.** Documentar o fluxo de contribuição para os alunos no `README.md`.
