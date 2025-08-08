# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Rodar a aplicação em produção e transformá-la em um guia prático de formação para desenvolvedores ágeis, com uma documentação que reflita a metodologia ágil na estrutura do projeto.

## 2. Requisitos e Desafios
- Não alterar o Dockerfile existente, pois ele já foi testado e roda com outra aplicação Laravel em produção.
- Usar os serviços existentes e rodando na rede `staging` da VPS (MySQL e Redis).
- Criar um padrão de estrutura para seguir no desenvolvimento do curso, planejamento de aulas como se fosse o backlog e as turmas com os baclogs referentes e sprints das aulas executando, a base é o projeto contruido ate o ponto atual que não foi documentado
- Manter o `ACTION_PLAN` atualizado com checklists para guiar o processo.


### Segurança de Credenciais
O repositório do projeto será público para fins educacionais. É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente** no diretório `src` usando Laravel Sail.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres em produção.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

### Documentação Ágil e Abrangente
- Organizar a documentação utilizando princípios ágeis (backlog,sprint backlog, sprints).
- Garantir que todo o trabalho do projeto, especialmente as partes anteriormente não documentadas da Turma 01, seja exaustivamente documentado.
- Manter a consistência e clareza em toda a documentação, servindo como um guia prático e um exemplo de gestão de projeto.

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
    - **Sprint 06:** Gerenciamento Seguro de Credenciais com Docker Secrets.
    - **Sprint 07:** Possíveis Problemas e Soluções Encontradas pelos Alunos
- **Ambiente de Desenvolvimento Local Estabilizado:** Problemas de roteamento do Traefik, extensões PHP, credenciais MySQL e setup do banco de dados foram resolvidos. O login e a criação de usuários estão funcionando.
- **`README.md` Atualizado:** O `README.md` principal foi atualizado para refletir a nova estrutura de sprints e direcionar os alunos.
- **Acessibilidade:** O link de clone do repositório na documentação foi alterado de SSH para HTTPS.

## 4. Próximos Passos e Itens Pendentes
- **Documentação:** Reestruturar a documentação para seguir os princípios ágeis, criando um backlog de aulas e sprints para cobrir todo o trabalho do projeto, incluindo as partes não documentadas da Turma 01 e 02.
- analise o projeto o que já foi feito pelos alunos, rotas, controllers, models, request, pacotes componentes, vamos distrinchar o site, o sistema de cadastro, e tudo mais analise os testes, o que faltou ser documentado e ensinado.
- **Infraestrutura:**
    - Avaliar e implementar Docker Secrets para gerenciamento seguro de credenciais em produção.
    - Analisar e otimizar a montagem de volumes e permissões em produção.
    - Implementar o fluxo de Pull Requests com revisão obrigatória no GitHub.
    - Avaliar a necessidade e implementar serviços de `queue` e `schedule` em produção.
adicionar no ACTION_PLAN.md as tarefas que não foram concluidas, as que precisam ser criadas, de acordo com o que combinarmos, depois de tudo planejado ai iniciamos cada uma atualizando o contexto 