# Sprint 12: Gerenciamento de Volumes e Permissões em Produção

## Objetivo da Sprint

Compreender e implementar as melhores práticas para o gerenciamento de volumes e permissões de arquivos em ambientes de produção com Docker Swarm. Garantir a persistência de dados, a segurança e o correto funcionamento da aplicação.

## Conceitos Chave

-   **Volumes Docker:** Mecanismo preferencial para persistir dados gerados e usados por contêineres Docker. Eles são gerenciados pelo Docker e são mais eficientes e seguros do que montar diretórios do host diretamente.
-   **Volumes Nomeados (Named Volumes):** Volumes gerenciados pelo Docker que são referenciados por um nome. São ideais para dados que precisam persistir além do ciclo de vida de um contêiner.
-   **Permissões de Arquivo (File Permissions):** Controle de acesso a arquivos e diretórios em sistemas Unix-like, usando usuários, grupos e modos (leitura, escrita, execução).
-   **Usuário `www-data`:** O usuário padrão sob o qual servidores web (como Nginx e PHP-FPM) geralmente executam processos em ambientes Linux.

## A Jornada da Implementação (Passo a Passo)

### Passo 1: Identificando a Necessidade de Volumes

Em uma aplicação Laravel, os principais diretórios que precisam de persistência e permissões específicas são:

-   **`storage/`:** Contém logs, cache de views, arquivos de sessão, uploads de usuários, etc. Este diretório precisa ser gravável pela aplicação.
-   **`bootstrap/cache/`:** Contém arquivos de cache gerados pelo Laravel, como `packages.php` e `services.php`. Também precisa ser gravável.

### Passo 2: Configurando Volumes Nomeados no `docker-swarm-prod.yml`

Já temos volumes nomeados configurados no nosso `docker-swarm-prod.yml`. Vamos revisá-los e entender seu propósito.

**Exemplo do `docker-swarm-prod.yml`:**

```yaml
# ... (outras configurações)

volumes:
  agilizando_logs:
    external: true # Para logs do Nginx, por exemplo
  agilizando_storage:
    external: true # Para o diretório storage/ da aplicação Laravel

networks:
  # ... (redes)
```

E no serviço `agilizando-app`:

```yaml
services:
  agilizando-app:
    # ...
    volumes:
      - agilizando_storage:/var/www/app/storage # Monta o volume nomeado no diretório storage da aplicação
    # ...
```

### Explicação Detalhada dos Volumes

-   **`agilizando_storage`:** Este volume é montado no diretório `storage/` da sua aplicação Laravel (`/var/www/app/storage` dentro do contêiner). Isso garante que todos os arquivos gerados pela aplicação (logs, uploads, cache, sessões) persistam mesmo se o contêiner for removido ou atualizado. É crucial que este volume seja gravável pelo usuário que a aplicação está rodando.
-   **`agilizando_logs`:** Este volume é montado para os logs do Nginx (`/var/log/nginx`). Isso permite que os logs do servidor web sejam persistidos e facilmente acessíveis fora do contêiner.

### Passo 3: Gerenciando Permissões

O Laravel precisa de permissões de escrita nos diretórios `storage/` e `bootstrap/cache/`. Em ambientes Docker, a forma mais robusta de garantir isso é definindo o usuário sob o qual o processo PHP-FPM roda dentro do contêiner.

No nosso `docker-swarm-prod.yml`, já definimos o usuário `82` (que geralmente corresponde ao `www-data` em imagens base Debian/Ubuntu) para o serviço `agilizando-app`:

```yaml
services:
  agilizando-app:
    # ...
    user: "82" # Define o UID do usuário que executa o processo
    # ...
```

**Verificação de Permissões (Dentro do Contêiner):**

Para verificar as permissões e o proprietário dos diretórios `storage/` e `bootstrap/cache/` dentro de um contêiner em execução, você pode usar:

```bash
# Obtenha o ID do contêiner do agilizando-app
docker ps --filter "name=agilizando_agilizando-app" --format "{{.ID}}"

# Acesse o contêiner
docker exec -it <ID_DO_CONTÊINER> bash

# Dentro do contêiner, verifique as permissões
ls -ld /var/www/app/storage
ls -ld /var/www/app/bootstrap/cache
```

**Saída Esperada:**

```
drwxrwxr-x    X www-data www-data      XXXX Aug  X XX:XX storage
drwxrwxr-x    X www-data www-data      XXXX Aug  X XX:XX bootstrap/cache
```

Você deve ver `www-data www-data` como proprietário e grupo, e permissões que permitam escrita (`w`) para o proprietário e o grupo. O `drwxrwxr-x` (775) é um bom padrão para diretórios que precisam de escrita pelo grupo.

### Passo 4: Garantindo Permissões na Construção da Imagem (Dockerfile)

É uma boa prática garantir que as permissões iniciais dos diretórios `storage` e `bootstrap/cache` sejam definidas corretamente durante a construção da imagem Docker. Isso evita problemas de permissão na primeira inicialização do contêiner.

**Código Sugerido (`docker/Dockerfile`):**

```dockerfile
# ... (parte superior do Dockerfile)

# Define o diretório de trabalho
WORKDIR /var/www/app

# ... (cópia dos arquivos da aplicação)

# Define as permissões para os diretórios de cache e storage
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# ... (resto do Dockerfile)
```

### Explicação Detalhada das Permissões no Dockerfile

-   **`chown -R www-data:www-data storage bootstrap/cache`:** Altera o proprietário e o grupo dos diretórios `storage` e `bootstrap/cache` (e seus conteúdos) para `www-data`. Isso é importante porque o processo PHP-FPM dentro do contêiner rodará como `www-data`.
-   **`chmod -R 775 storage bootstrap/cache`:** Define as permissões recursivamente para `775` (`rwxrwxr-x`). Isso significa:
    -   **Proprietário (`www-data`):** Leitura, escrita e execução.
    -   **Grupo (`www-data`):** Leitura, escrita e execução.
    -   **Outros:** Leitura e execução.

## Próximo Passo e Verificação

1.  **Revisar `docker-swarm-prod.yml`:** Confirme que os volumes nomeados estão configurados e montados corretamente.
2.  **Modificar `docker/Dockerfile`:** Adicione as linhas `chown` e `chmod` para garantir as permissões na construção da imagem.
3.  **Reconstruir a Imagem Docker:** Como o `Dockerfile` foi alterado, você precisará reconstruir a imagem da sua aplicação e fazer o push para o `ghcr.io`.
4.  **Deploy:** Atualize o stack em produção:
    ```bash
    docker stack deploy -c docker-swarm-prod.yml --with-registry-auth agilizando
    ```
5.  **Verificação:** Após o deploy, acesse um contêiner da sua aplicação e verifique as permissões dos diretórios `storage` e `bootstrap/cache` conforme o Passo 3.

Parabéns! Você agora tem um controle robusto sobre a persistência de dados e as permissões de arquivos em seu ambiente de produção Docker Swarm.