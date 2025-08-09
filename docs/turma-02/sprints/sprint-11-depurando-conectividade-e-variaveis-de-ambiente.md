# Sprint 11: Depurando Conectividade e Variáveis de Ambiente em Docker Swarm

## Objetivo da Sprint

Esta sprint tem como objetivo ensinar técnicas de depuração para problemas de conectividade de rede e interpretação de variáveis de ambiente em ambientes Docker Swarm, focando no erro comum `SQLSTATE[HY000] [2002] php_network_getaddresses: getaddrinfo for <hostname> failed: Name does not resolve`.

## Conceitos Chave

-   **Service Discovery no Docker Swarm:** Como os serviços se encontram e se comunicam usando seus nomes como hostnames.
-   **Resolução de DNS vs. Interpretação de Variáveis de Ambiente:** Entender que um problema de "nome não resolvido" pode não ser um problema de DNS do sistema operacional, mas sim de como a aplicação lê suas configurações.
-   **Precisão em Arquivos `.env`:** A importância de evitar espaços em branco ou caracteres invisíveis em arquivos de configuração.
-   **Técnicas de Depuração:** Utilização de ferramentas como `ping` dentro do contêiner e rotas de debug da aplicação.

## O Problema: `Name does not resolve`

Ao tentar conectar a aplicação Laravel ao banco de dados MySQL (ou Redis), o seguinte erro pode ocorrer:

```
SQLSTATE[HY000] [2002] php_network_getaddresses: getaddrinfo for <hostname> failed: Name does not resolve
```

Onde `<hostname>` era `db-staging` ou `clubesiga-staging_db-staging`.

Inicialmente, este erro sugere um problema de rede ou DNS, onde o contêiner da aplicação não consegue encontrar o endereço IP do serviço de banco de dados.

## Investigação e Depuração (Passo a Passo)

Para diagnosticar a causa raiz, seguimos os seguintes passos:

### Passo 1: Verificar a Conectividade de Rede do Contêiner

É crucial verificar se o contêiner da aplicação consegue, de fato, resolver o nome do host do banco de dados e alcançá-lo na rede Docker. Para isso, acessamos o contêiner e usamos o comando `ping`.

1.  **Obter o ID do Contêiner:**
    ```bash
    docker ps --filter "name=agilizando_agilizando-app" --format "{{.ID}}"
    # Ou, se o app não estiver rodando, verificar o worker:
    # docker ps --filter "name=agilizando_agilizando-worker" --format "{{.ID}}"
    ```

2.  **Acessar o Contêiner e Testar o Ping:**
    ```bash
    docker exec -it <ID_DO_CONTÊINER> bash
    # Dentro do contêiner:
    ping db-staging # Ou o nome do seu serviço de DB
    ```

**Resultado da Investigação:** No nosso caso, o `ping db-staging` **funcionou perfeitamente**, retornando um endereço IP e mostrando que havia comunicação. Isso foi um indicativo crucial de que o problema **não era de rede ou DNS no nível do sistema operacional do contêiner**, mas sim de como o Laravel estava interpretando a configuração.

### Passo 2: Verificar a Conectividade com o Redis (Exemplo Adicional)

Para garantir que outros serviços também estavam acessíveis, um teste similar foi feito para o Redis:

```bash
# Dentro do contêiner:
redis-cli -h redis-staging ping
# Espera-se a resposta: PONG
```

Este teste também confirmou a conectividade de rede.

### Passo 3: Inspecionar a Configuração do Laravel em Tempo de Execução

Como a rede estava funcionando, o próximo passo foi verificar o que o Laravel *realmente* estava lendo como configuração de banco de dados. Para isso, uma rota de debug temporária foi criada:

```php
// src/routes/web.php (ou uma rota temporária para debug)
Route::get('/debug-db-config', function () {
    // Imprime a configuração de banco de dados que o Laravel está usando
    // EXATAMENTE neste momento da requisição web.
    dd(config('database.connections.mysql'));
});
```

Ao acessar essa rota no navegador, foi possível ver a configuração completa que o Laravel estava utilizando. Foi aqui que a causa raiz foi revelada.

## A Causa Raiz: Espaços em Branco no `.env`

Após uma investigação rigorosa, descobriu-se que o problema era a presença de **espaços em branco** nas linhas de configuração do banco de dados no arquivo `.env.production` (ou no `.env` que estava sendo usado em produção).

Por exemplo, em vez de:

```
DB_HOST=db-staging
```

O arquivo continha algo como:

```
DB_HOST= db-staging
```

Ou:

```
DB_HOST=db-staging 
```

Esses espaços, embora invisíveis a olho nu, fazem com que o Laravel interprete o valor da variável de ambiente de forma incorreta, incluindo o espaço como parte do nome do host, o que impede a resolução correta.

## A Solução

A solução foi simples: **remover todos os espaços em branco** antes e depois do sinal de igual (`=`) e no final da linha para todas as variáveis de ambiente relacionadas ao banco de dados (e, por extensão, a qualquer outra variável de ambiente).

**Exemplo Correto:**

```
DB_CONNECTION=mysql
DB_HOST=db-staging
DB_PORT=3306
DB_DATABASE=FILE:/run/secrets/app_agilizando_db
DB_USERNAME=FILE:/run/secrets/db_username
DB_PASSWORD=FILE:/run/secrets/db_password
```

## Conclusão

Este caso demonstra a importância da **meticulosidade** na configuração de ambientes e da **depuração sistemática**. Um erro que parecia ser de rede/DNS revelou-se um problema sutil de formatação de variáveis de ambiente. Sempre confie nos seus testes e investigue a fundo, usando as ferramentas disponíveis para ver o que a aplicação *realmente* está lendo.