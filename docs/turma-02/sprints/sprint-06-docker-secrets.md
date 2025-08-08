# Sprint 06: Gerenciamento Seguro de Credenciais com Docker Secrets

## Bem-vindo à Sprint 06!

Nesta Sprint, você mergulhará em um dos pilares da segurança em ambientes de produção: o **gerenciamento seguro de credenciais**. Aprenderemos a utilizar **Docker Secrets** para proteger informações sensíveis, como senhas de banco de dados e chaves de API, garantindo que elas nunca sejam expostas no código-fonte ou em arquivos de configuração versionados.

Ao final desta Sprint, você terá uma compreensão prática de como implementar e verificar o uso de Docker Secrets, fortalecendo a postura de segurança das suas aplicações.

### Pré-requisitos:

Certifique-se de que concluiu as Sprints anteriores e que todos os seus testes estão passando:

*   [Sprint 01: Fundamentos de Testes e TDD - Autenticação](./sprint-01-tdd-autenticacao.md)
*   [Sprint 02: TDD na Prática - Funcionalidade de Registro](./sprint-02-tdd-registro.md)
*   [Sprint 03: TDD e Segurança - Corrigindo Vulnerabilidades NPM](./sprint-03-tdd-npm-audit.md)
*   [Sprint 04: TDD e Mocking - Testando Serviços Externos (RecaptchaService)](./sprint-04-tdd-recaptcha-service.md)
*   [Sprint 05: TDD e Integração com IA (Gemini CLI)](./sprint-05-tdd-ai-integration.md)

---

## Por que Docker Secrets?

Em um ambiente de desenvolvimento e, principalmente, de produção, credenciais como senhas de banco de dados, chaves de API e tokens de acesso são informações extremamente sensíveis. Expor essas credenciais em variáveis de ambiente (que podem ser facilmente inspecionadas), em arquivos de configuração versionados (como o Git) ou em logs é um risco de segurança enorme.

**Docker Secrets** oferece uma solução segura para gerenciar essas informações. Ele as armazena de forma criptografada no Docker Swarm e as injeta nos contêineres como arquivos temporários em memória (tmpfs), garantindo que:

*   As credenciais não são persistidas no disco do contêiner.
*   Não aparecem em logs ou em `docker inspect`.
*   São acessíveis apenas pelos serviços que precisam delas.

## Sua Missão: Implementando Docker Secrets

Nossa aplicação Laravel precisa de acesso a credenciais como `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `APP_KEY`, etc. Atualmente, elas podem estar em arquivos `.env` ou variáveis de ambiente.

### Passo 1: Criando os Secrets no Docker Swarm Manager

Para cada credencial sensível, você precisará criá-la como um secret no seu nó gerente do Docker Swarm (seu servidor de produção).

**Exemplo (para a senha do banco de dados):**

```bash
# No seu servidor de produção (nó gerente do Swarm)
echo "sua_senha_do_banco" | docker secret create db_password_agilizando -
```

Repita este processo para todas as credenciais que você deseja proteger (ex: `db_username_agilizando`, `db_database_agilizando`, `app_key_agilizando`, `recaptcha_secret_key_agilizando`, etc.). Escolha nomes descritivos para seus secrets.

Você pode listar seus secrets com:

```bash
docker secret ls
```

### Passo 2: Utilizando os Secrets no `docker-swarm-prod.yml`

Agora, você precisa instruir seu serviço no `docker-swarm-prod.yml` a utilizar esses secrets. Você já tem uma seção `secrets:` no seu arquivo, mas vamos garantir que ela esteja completa e correta.

**Exemplo (para o serviço `agilizando-app`):**

```yaml
version: "3.8"

secrets:
  # Declare que estes secrets existem no Swarm
  db_password_agilizando:
    external: true
  db_username_agilizando:
    external: true
  db_database_agilizando:
    external: true
  app_key_agilizando:
    external: true
  # Adicione outros secrets aqui, se necessário

services:
  agilizando-app:
    # ... outras configurações ...
    secrets:
      # Associe os secrets ao serviço
      - db_password_agilizando
      - db_username_agilizando
      - db_database_agilizando
      - app_key_agilizando
      # Adicione outros secrets aqui
    # ...
```

### Passo 3: Acessando os Secrets na Aplicação Laravel

Dentro do contêiner, cada secret é montado como um arquivo temporário no diretório `/run/secrets/`. O nome do arquivo é o nome do secret.

Sua aplicação Laravel precisará ler esses arquivos. Você pode fazer isso no seu `config/database.php` ou `config/app.php` (ou em um Service Provider) da seguinte forma:

```php
// Exemplo para DB_PASSWORD
'password' => env('DB_PASSWORD', file_get_contents('/run/secrets/db_password_agilizando')),

// Exemplo para APP_KEY
'key' => env('APP_KEY', file_get_contents('/run/secrets/app_key_agilizando')),
```

**Importante:** Use `env()` como fallback para o ambiente de desenvolvimento local, onde os secrets não estarão disponíveis.

### Passo 4: Verificação e Teste

Após configurar os secrets e atualizar o `docker-swarm-prod.yml`:

1.  **Deploy:** Execute o deploy da stack no seu servidor de produção:
    ```bash
    docker stack deploy -c docker-swarm-prod.yml agilizando
    ```
2.  **Verificação:** Acesse a aplicação e verifique se ela está funcionando corretamente. Se houver problemas de conexão com o banco de dados, é provável que os secrets não estejam sendo lidos corretamente.
3.  **Segurança:** Tente inspecionar o contêiner (`docker inspect <container_id>`) ou entrar nele (`docker exec -it <container_id> bash`) e procure pelas credenciais. Você não deve encontrá-las em variáveis de ambiente ou em arquivos persistentes.

---

## Conclusão da Sprint 06

Parabéns! Você concluiu a Sprint 06. Você aprendeu a:

*   Compreender a importância da segurança de credenciais.
*   Criar e gerenciar **Docker Secrets**.
*   Configurar seus serviços para utilizar secrets no `docker-swarm-prod.yml`.
*   Acessar secrets de forma segura dentro da sua aplicação.

No próximo Sprint, abordaremos a otimização de volumes ou a implementação de serviços de fila/agendamento.
