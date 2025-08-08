# Contexto do Projeto: Migração e Modernização de Deploy

## 1. Objetivo Principal
Rodar a aplicação em produção
## 2. Requisitos e Desafios
não alterar o Dorckerfile, pois ele já foi testado e roda com outra aplicação laravel em produção
usar os serviços existentes e rodando na rede staging da vps, mysql e redis
avaliar a necessidade de serviços como queue e schedule para aplicação em produção
mantenha o `ACTION_PLAN` atualizado elabore seu plano de ação e adicione os checklist para se guia e não se perder
fazer uma anlise das montagens dos volumes, se os arquivos foram copiados, se as permissões estão de acordo com o usuario. 

### Segurança de Credenciais
O repositório do projeto será público para fins educacionais (compartilhado com alunos). É crucial que nenhuma credencial (banco de dados, APIs, etc.) seja exposta. A implementação de **Docker Secrets** é mandatória para gerenciar informações sensíveis.

### Infraestrutura com Docker
- A arquitetura deverá utilizar **Docker Swarm**.
- O ambiente de desenvolvimento (`dev`) será executado **localmente**, diretório `src` usar o sail, status rodando.
- O uso de **volumes nomeados** é necessário para persistência de dados de forma desacoplada dos contêineres em produção.

### Controle de Acesso ao Repositório
Implementar um fluxo de trabalho e regras de proteção no repositório GitHub para impedir que colaboradores (alunos) enviem commits ou merges diretamente para a branch `main`. O fluxo ideal será via **Pull Requests com revisão obrigatória**.

## 3. Status Atual
- A configuração inicial do repositório no GitHub foi concluída.
- A chave SSH para acesso ao servidor de produção está configurada.
- O `git pull` para sincronização de arquivos está funcional.

## 4. Itens Pendentes (Ações Imediatas)
discutir e planejar a documentação do repositório mostrando como todo o processo de criação do site do projeto social foi realizado, como aplicamos a nossa metodologia de aprender com a pratica de projetos reais. a documentação devera servir como o guia de aprendizado, permitindo qualquer pessoa baixar sseguir os passos de execução desde criar um projeto no github, configurar o backlog e cada sprint, ate a conclusão do projeto.
Criar a pasta `docs` e criar um overview-agile-team-one.md sobre o site feito pela primeira turma do projeto social Agilizando futuro, onde ensinamos metodologia ageis, elaboração do projeto, backlog, sprints etc, mas fale dos assuntos como se estivesse ensinando, pra quem não participou, possa estudar e fazer em casa, fale da tecnologia usada no fronte o REACT com o inertia do laravel e do Back php laravel, como o curso foi pratico na pode separar os temas do que foi ensinado aqui em arquivos separados para cada assunto e linkar eles no overview, ensinamos a configurar o ambiente de desenvolvimento instalando o php, node, configurar apache, nginx, usar virtual domain e com ssl via mkcert. vale lembrar que ensinamos fazer a integração com google recaptcha topa planejar e criar comigo deixando esse repositório como um verdadeiro guia de formação de agiles developers?