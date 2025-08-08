# Aula 02: Resolvendo Problemas de Permissão em Ambientes Docker

## O Desafio: "Permission Denied" e "Could Not Delete"

Durante a configuração do ambiente de desenvolvimento e a execução de comandos como `composer install` e `npm run build`, nos deparamos com erros persistentes de "Permission denied" (permissão negada) e "Could not delete" (não foi possível apagar).

Esses erros indicavam que o usuário que estava executando os comandos não tinha as permissões necessárias para escrever ou modificar arquivos em diretórios críticos do projeto, como `vendor`, `storage` e `public/build`.

## A Causa Raiz: Bind Mounts e Propriedade de Arquivos

Em ambientes Docker que utilizam **bind mounts** (onde um diretório do seu sistema operacional é montado diretamente dentro de um contêiner, como o diretório `src` do nosso projeto), as permissões de arquivo e diretório no seu **sistema operacional (host)** são as que prevalecem.

O problema surge quando arquivos ou diretórios são criados por um usuário diferente (por exemplo, pelo `root`, se um comando foi executado com `sudo` em algum momento, ou por um usuário diferente dentro do contêiner). Nesses casos, o seu usuário normal pode não ter permissão para modificá-los, mesmo que o contêiner esteja rodando.

## A Solução: Ajustando Propriedade e Permissões

A solução foi garantir que o seu usuário (`webert`) fosse o proprietário de todos os arquivos e diretórios relevantes e que as permissões permitissem a escrita.

### Comandos Utilizados e Explicação:

Para resolver os problemas de permissão nos diretórios `src/vendor`, `src/storage` e `src/public/build`, executamos os seguintes comandos na raiz do projeto (`/home/webert/www/agilizando.clubesiga.com.br`):

```bash
# 1. Ajustar propriedade e permissões para o diretório 'vendor'
sudo chown -R $USER:$USER src/vendor
sudo chmod -R 775 src/vendor

# 2. Ajustar propriedade e permissões para o diretório 'storage'
sudo chown -R $USER:$USER src/storage
sudo chmod -R 775 src/storage

# 3. Ajustar propriedade e permissões para o diretório 'public/build'
sudo chown -R $USER:$USER src/public/build
sudo chmod -R 775 src/public/build
```

*   `sudo`: Executa o comando com privilégios de superusuário.
*   `chown -R $USER:$USER <diretorio>`:
    *   `chown`: Altera o proprietário e o grupo de arquivos/diretórios.
    *   `-R`: Aplica a mudança recursivamente (em todos os arquivos e subdiretórios).
    *   `$USER:$USER`: Define o proprietário e o grupo como o seu usuário atual (ex: `webert:webert`).
*   `chmod -R 775 <diretorio>`:
    *   `chmod`: Altera as permissões de arquivos/diretórios.
    *   `-R`: Recursivo.
    *   `775`: Define as permissões:
        *   `7` (rwx): Proprietário tem permissão de leitura, escrita e execução.
        *   `7` (rwx): Grupo tem permissão de leitura, escrita e execução.
        *   `5` (r-x): Outros usuários têm permissão de leitura e execução.

### Resultado:

Após aplicar essas correções, os comandos `composer install` e `npm run build` foram executados com sucesso, indicando que os problemas de permissão foram resolvidos.

---

*Próximo passo: Rodar a suíte de testes completa para verificar todas as correções.*