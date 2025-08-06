# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Migrar a aplicação de uma VPS (Virtual Private Server) para uma nova infraestrutura, adotando práticas de deploy mais modernas, seguras e eficientes com Docker Swarm.

## 2. Requisitos e Desafios

### Segurança de Credenciais
O repositório do projeto será público para fins educacionais (compartilhado com alunos). É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente**, e não mais na VPS.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

## 3. Status Atual
- A configuração inicial do repositório no GitHub foi concluída.
- A chave SSH para acesso ao servidor de produção está configurada.
- O `git pull` para sincronização de arquivos está funcional.

## 4. Itens Pendentes (Ações Imediatas)
- Configurar a aplicaçao para rodar localmente usando o sail, de forma que possa usar o traefik, mysql, redis, ja   rodando `docker ps`para verificar os serviços
- Ambiente local não tá funcionando o projeto reside na pasta /src
- Revisar e configurar o `docker-swarm-prod.yml` para utilizar Docker Secrets e volumes nomeados.
