# Aula 02: Resolvendo Problemas de Permissão em Ambientes Docker

## O Desafio: "Permission Denied" e "Could Not Delete"

Durante a configuração do ambiente de desenvolvimento e a execução de comandos como `composer install` e `npm run build`, nos deparamos com erros persistentes de "Permission denied" (permissão negada) e "Could not delete" (não foi possível apagar).

Esses erros indicavam que o usuário que estava executando os comandos não tinha as permissões necessárias para escrever ou modificar arquivos em diretórios críticos do projeto, como `vendor`, `node_modules`, `storage` e `public/build`.

## A Causa Raiz: Bind Mounts e Propriedade de Arquivos

Em ambientes Docker que utilizam **bind mounts** (onde um diretório do seu sistema operacional é montado diretamente dentro de um contêiner, como o diretório `src` do nosso projeto), as permissões de arquivo e diretório no seu **sistema operacional (host)** são as que prevalecem.

O problema surge quando arquivos ou diretórios são criados por um usuário diferente (por exemplo, pelo `root`, se um comando foi executado com `sudo` em algum momento, ou por um usuário diferente dentro do contêiner). Nesses casos, o seu usuário normal pode não ter permissão para modificá-los.

## A Solução: Ajustando Propriedade e Permissões

A solução foi garantir que o seu usuário (`webert`) fosse o proprietário de todos os arquivos e diretórios relevantes e que as permissões permitissem a escrita.

### Comandos Utilizados e Explicação:

Para resolver os problemas de permissão em todo o diretório `src`, executamos os seguintes comandos na raiz do projeto (`/home/webert/www/agilizando.clubesiga.com.br`):

```bash
sudo chown -R $USER:$USER src
sudo chmod -R 775 src
```

*   `sudo`: Executa o comando com privilégios de superusuário.
*   `chown -R $USER:$USER src`:
    *   `chown`: Altera o proprietário e o grupo de arquivos/diretórios.
    *   `-R`: Aplica a mudança recursivamente (em todos os arquivos e subdiretórios).
    *   `$USER:$USER`: Define o proprietário e o grupo como o seu usuário atual (ex: `webert:webert`).
*   `chmod -R 775 src`:
    *   `chmod`: Altera as permissões de arquivos/diretórios.
    *   `-R`: Recursivo.
    *   `775`: Define as permissões:
        *   `7` (rwx): Proprietário tem permissão de leitura, escrita e execução.
        *   `7` (rwx): Grupo tem permissão de leitura, escrita e execução.
        *   `5` (r-x): Outros usuários têm permissão de leitura e execução.

### Resolvendo Problemas de Dependência NPM

Após ajustar as permissões, enfrentamos desafios com as dependências JavaScript, incluindo conflitos de versão e vulnerabilidades persistentes. A sequência de comandos abaixo foi utilizada para resolver esses problemas:

```bash
# 1. Gerar o package-lock.json (se estiver faltando)
cd src && npm i --package-lock-only

# 2. Atualizar o laravel-vite-plugin para resolver conflito com Vite 7.x
cd src && npm install laravel-vite-plugin@2.0.0

# 3. Corrigir vulnerabilidades de segurança (incluindo sweetalert2)
cd src && npm audit fix --force

# 4. Recompilar os assets do frontend
cd src && npm run build
```

### Resultado:

Após aplicar todas essas correções, os comandos `composer install` e `npm run build` foram executados com sucesso, e o ambiente de desenvolvimento está pronto.

---

*Próximo passo: Rodar a suíte de testes completa para verificar todas as correções.*