# Sprint 09: Fila de E-mails com Redis - Performance na Prática

## Objetivo da Sprint

Implementar e configurar o processamento de filas (Queues) com Redis em nosso ambiente de produção. Vamos mover o envio de e-mail do formulário de contato para um processo em segundo plano (assíncrono), melhorando drasticamente a velocidade de resposta para o usuário.

## Conceitos Chave

- **Processamento Assíncrono:** Executar tarefas "pesadas" ou demoradas em background, sem que a aplicação principal (e o usuário) precise esperar pela sua conclusão.
- **Driver de Fila (Queue Driver):** O mecanismo que o Laravel usa para gerenciar jobs. Pode ser o `sync` (síncrono, padrão), `database` (usando uma tabela no banco) ou `redis`.
- **Worker:** Um processo do Laravel, separado da aplicação web, cuja única função é escutar a fila e executar os "jobs" (tarefas) que chegam.

## A Jornada da Implementação (Passo a Passo)

Na Sprint 08, já preparamos nosso `ContactCreatedListener` para a fila ao implementar a interface `ShouldQueue`. Agora, vamos configurar a infraestrutura para que isso funcione.

### Passo 1: Dizer ao Laravel para Usar o Redis

A primeira mudança é no nosso arquivo de configuração de ambiente. Precisamos instruir o Laravel a parar de processar as filas de forma síncrona e começar a enviá-las para o Redis.

Em produção, isso é feito via **Docker Secrets**. O secret `QUEUE_CONNECTION` deve ter o valor `redis`.

**Arquivo de Segredo (`QUEUE_CONNECTION`):**
```
redis
```

### Passo 2: Criar o Serviço "Worker" no Docker Swarm

O "worker" é o coração do nosso sistema de filas. Ele é um contêiner idêntico ao da nossa aplicação, mas em vez de rodar o servidor web (PHP-FPM), ele roda o comando `queue:work`.

Vamos adicionar um novo serviço ao nosso `docker-swarm-prod.yml`.

**Código Sugerido (`docker-swarm-prod.yml`):**
```yaml
version: "3.8"

services:
  # ... (serviço 'app' e 'nginx' continuam aqui, sem alterações) ...

  app:
    image: ${APP_IMAGE_TAG:-ghcr.io/webertmaximiano/agilizando-app:latest}
    # ... (resto da configuração do 'app') ...

  nginx:
    image: nginx:latest
    # ... (resto da configuração do 'nginx') ...

  # NOVO SERVIÇO WORKER
  worker:
    image: ${APP_IMAGE_TAG:-ghcr.io/webertmaximiano/agilizando-app:latest}
    command: "php artisan queue:work --sleep=3 --tries=3"
    networks:
      - agilizando
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    secrets:
      - source: DB_DATABASE
        target: DB_DATABASE
      - source: DB_USERNAME
        target: DB_USERNAME
      - source: DB_PASSWORD
        target: DB_PASSWORD
      - source: REDIS_PASSWORD
        target: REDIS_PASSWORD
      - source: QUEUE_CONNECTION
        target: QUEUE_CONNECTION
      # ... (adicione aqui TODOS os outros segredos que a aplicação precisa)

# ... (resto do arquivo: networks, secrets, etc.) ...
```

### Explicação Detalhada do Serviço `worker`

- **`image: ${APP_IMAGE_TAG}`:** Usa a **mesma imagem** da nossa aplicação principal. O worker precisa de todo o código do Laravel para processar os jobs.
- **`command: "php artisan queue:work ..."`:** Este é o comando que define o contêiner como um worker.
    - `--sleep=3`: Pausa por 3 segundos se não houver jobs na fila, para não consumir CPU desnecessariamente.
    - `--tries=3`: Tenta re-executar um job que falhou por até 3 vezes.
- **`networks: - agilizando`:** Precisa estar na mesma rede para se comunicar com o Redis.
- **`deploy: ...`:** Garantimos que apenas uma réplica do worker esteja rodando.
- **`secrets: ...`:** O worker precisa dos mesmos segredos que a aplicação para se conectar ao banco, Redis, serviço de e-mail, etc.

## Próximo Passo e Verificação

1.  **Deploy:** Atualize o stack em produção com o novo arquivo `docker-swarm-prod.yml`:
    ```bash
    docker stack deploy -c docker-swarm-prod.yml --with-registry-auth agilizando
    ```
2.  **Verificação dos Serviços:** Liste os serviços para confirmar que o `agilizando_worker` está rodando:
    ```bash
    docker service ls
    ```
3.  **Monitoramento (A Mágica Acontecendo):**
    - Abra o formulário de contato no site e preencha-o. Clique em enviar. Você notará que a página de agradecimento carrega **instantaneamente**.
    - Em outro terminal, veja os logs do worker em tempo real:
      ```bash
      docker service logs -f agilizando_worker
      ```
    - Você verá o worker recebendo, processando e completando o job `App\Listeners\ContactCreatedListener`.
    - Pouco depois, o e-mail de confirmação chegará na sua caixa de entrada.

Parabéns! Você acaba de implementar uma das otimizações de performance mais importantes em aplicações web modernas.
