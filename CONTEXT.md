# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Migrar a aplicação de uma VPS (Virtual Private Server) para uma nova infraestrutura, adotando práticas de deploy mais modernas, seguras e eficientes com Docker Swarm. e colocar a aplicação rodando no ambiente local de desenvolvimento

## 2. Requisitos e Desafios

### Segurança de Credenciais
O repositório do projeto será público para fins educacionais (compartilhado com alunos). É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente**, e não mais na VPS usar o sail.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres e bind mount localmente.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

## 3. Status Atual
- A configuração inicial do repositório no GitHub foi concluída.
- A chave SSH para acesso ao servidor de produção está configurada.
- O `git pull` para sincronização de arquivos está funcional.

## 4. Itens Pendentes (Ações Imediatas)
- resolver a renderização em produção, usar curl verboso para identificar erros 
https://agilizando.clubesiga.com.br/ 

pra rodar comandos na vps use ssh vps-clubesiga-webert se precisar 