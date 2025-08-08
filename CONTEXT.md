# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Rodar a aplicação em produção e transformá-la em um guia prático de formação para desenvolvedores ágeis.

## 2. Requisitos e Desafios
- Não alterar o Dockerfile existente, pois ele já foi testado e roda com outra aplicação Laravel em produção.
- Usar os serviços existentes e rodando na rede `staging` da VPS (MySQL e Redis).
- Avaliar a necessidade de serviços como `queue` e `schedule` para a aplicação em produção.
- Manter o `ACTION_PLAN` atualizado com checklists para guiar o processo.
- Fazer uma análise das montagens dos volumes em produção: se os arquivos foram copiados e se as permissões estão de acordo com o usuário.

### Segurança de Credenciais
O repositório do projeto será público para fins educacionais. É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente** no diretório `src` usando Laravel Sail.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres em produção.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

## 3. Status Atual (Conquistas)
- A configuração inicial do repositório no GitHub foi concluída.
- A chave SSH para acesso ao servidor de produção está configurada.
- O `git pull` para sincronização de arquivos está funcional.
- **Aplicação em Produção:** O site `agilizando.clubesiga.com.br` está no ar e funcional.
- **Correção de Erros em Produção:** O erro de JavaScript (`submit is not defined`) e o erro de conexão com o banco de dados (`Name does not resolve`) foram diagnosticados e corrigidos.
- **Testes Locais:** Todos os testes de feature e unitários estão passando localmente, com o ambiente de teste configurado para usar SQLite em memória.
- **Documentação da Turma 01:** O guia completo de formação da Turma 01 foi criado na pasta `docs/`.
- **Metodologia de Sprints para Turma 02:** A nova metodologia de ensino por Sprints e TDD foi implementada, com os seguintes guias criados:
    - **Sprint 01:** Fundamentos de Testes e TDD - Autenticação.
    - **Sprint 02:** TDD na Prática - Funcionalidade de Registro.
    - **Sprint 03:** TDD e Segurança - Corrigindo Vulnerabilidades NPM.
    - **Sprint 04:** TDD e Mocking - Testando Serviços Externos (RecaptchaService).
    - **Sprint 05:** TDD e Integração com IA (Gemini CLI).
- **`README.md` Atualizado:** O `README.md` principal foi atualizado para refletir a nova estrutura de sprints e direcionar os alunos.
- **Acessibilidade:** O link de clone do repositório na documentação foi alterado de SSH para HTTPS.

## 4. Próximos Passos e Itens Pendentes
- **Documentação:** Continuar a criação de novas Sprints para a Turma 02, abordando outros testes e funcionalidades.
- **Segurança:** Implementar a correção das vulnerabilidades de segurança do NPM (conforme Sprint 03) e outras que possam surgir.
- **Infraestrutura:**
    - Avaliar e implementar Docker Secrets para gerenciamento seguro de credenciais em produção.
    - Analisar e otimizar a montagem de volumes e permissões em produção.
    - Implementar o fluxo de Pull Requests com revisão obrigatória no GitHub.
    - Avaliar a necessidade e implementar serviços de `queue` e `schedule` em produção.
