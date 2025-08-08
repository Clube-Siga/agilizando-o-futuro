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
- resolver a renderização em produção, usar curl verboso para identificar erros 
https://agilizando.clubesiga.com.br/ 
eferenceError: submit is not defined
    at ep (Hero-6hSTC0u7.js:73:35183)
    at Iu (app-CS1N2pDJ.js:44:16970)
    at iy (app-CS1N2pDJ.js:46:43867)
    at ry (app-CS1N2pDJ.js:46:39648)
    at Xw (app-CS1N2pDJ.js:46:39576)
    at ll (app-CS1N2pDJ.js:46:39430)
    at Bs (app-CS1N2pDJ.js:46:35817)
    at Zh (app-CS1N2pDJ.js:46:34768)
    at x (app-CS1N2pDJ.js:31:1555)
    at MessagePort.le (app-CS1N2pDJ.js:31:1919)
overrideMethod @ hook.js:608Understand this error
app-CS1N2pDJ.js:46 Uncaught ReferenceError: submit is not defined
    at ep (Hero-6hSTC0u7.js:73:35183)
    at Iu (app-CS1N2pDJ.js:44:16970)
    at iy (app-CS1N2pDJ.js:46:43867)
    at ry (app-CS1N2pDJ.js:46:39648)
    at Xw (app-CS1N2pDJ.js:46:39576)
    at ll (app-CS1N2pDJ.js:46:39430)
    at Bs (app-CS1N2pDJ.js:46:35817)
    at Zh (app-CS1N2pDJ.js:46:34768)
    at x (app-CS1N2pDJ.js:31:1555)
    at MessagePort.le (app-CS1N2pDJ.js:31:1919)Understand this error