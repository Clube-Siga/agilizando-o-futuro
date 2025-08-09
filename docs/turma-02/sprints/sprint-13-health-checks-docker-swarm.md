# Sprint 13: Health Checks para Contêineres em Docker Swarm

## Objetivo da Sprint

Compreender a importância dos Health Checks (Verificações de Saúde) em contêineres Docker e aprender a implementá-los em um ambiente Docker Swarm. Isso permitirá que o orquestrador monitore ativamente a saúde dos serviços, garantindo maior disponibilidade e resiliência da aplicação.

## Conceitos Chave

-   **Health Check:** Uma instrução definida no `Dockerfile` ou no arquivo de stack (`docker-compose.yml` ou `docker-swarm.yml`) que o Docker usa para determinar se um contêiner está "saudável" e pronto para operar, e não apenas "rodando".
-   **Orquestração Inteligente:** Com Health Checks, o Docker Swarm pode tomar decisões inteligentes, como não direcionar tráfego para um contêiner doente, reiniciá-lo automaticamente se ele falhar repetidamente, ou esperar que ele esteja saudável antes de considerá-lo pronto para o serviço.
-   **Tipos de Verificação:**
    -   **`CMD` ou `CMD-SHELL`:** Executa um comando dentro do contêiner. Se o comando retornar código de saída `0`, o contêiner é considerado saudável. Qualquer outro código indica falha.
    -   **`HTTP`:** Faz uma requisição HTTP para uma URL específica dentro do contêiner. Se a resposta for um código de status `2xx` ou `3xx`, é saudável.

## A Jornada da Implementação (Passo a Passo)

Vamos adicionar Health Checks aos nossos serviços `agilizando-app` e `agilizando-worker` no `docker-swarm-prod.yml`.

### Passo 1: Definindo o Health Check no `docker-swarm-prod.yml`

O Health Check é configurado na seção `deploy.healthcheck` de cada serviço. Para aplicações Laravel, um Health Check baseado em `CMD-SHELL` que verifica a conexão com o banco de dados ou a execução de um comando Artisan simples é uma boa prática.

**Código Sugerido (`docker-swarm-prod.yml` - Adicionar ou Modificar nos Serviços `agilizando-app` e `agilizando-worker`):**

```yaml
services:
  agilizando-app:
    # ... (configurações existentes)
    deploy:
      # ... (outras configurações de deploy)
      healthcheck:
        test: ["CMD-SHELL", "php artisan migrate:status || exit 1"]
        interval: 30s
        timeout: 10s
        retries: 3
        start_period: 60s # Tempo para o contêiner iniciar antes de começar as verificações

  agilizando-worker:
    # ... (configurações existentes)
    deploy:
      # ... (outras configurações de deploy)
      healthcheck:
        test: ["CMD-SHELL", "php artisan queue:work --stop-when-empty --timeout=5 || exit 1"]
        interval: 30s
        timeout: 10s
        retries: 3
        start_period: 60s

  # ... (outros serviços)
```

### Explicação Detalhada dos Parâmetros do Health Check

-   **`test: ["CMD-SHELL", "comando"]`:** O comando que será executado para verificar a saúde.
    -   Para `agilizando-app`: `php artisan migrate:status || exit 1` verifica se a aplicação consegue se conectar ao banco de dados e se as migrações estão em dia. Se falhar, o comando retorna um código de saída diferente de zero, indicando falha.
    -   Para `agilizando-worker`: `php artisan queue:work --stop-when-empty --timeout=5 || exit 1` verifica se o worker consegue iniciar e processar a fila. O `--stop-when-empty` e `--timeout=5` são para garantir que o comando termine rapidamente se não houver jobs, evitando que o health check fique preso.
-   **`interval: 30s`:** O tempo de espera entre as verificações de saúde (a cada 30 segundos).
-   **`timeout: 10s`:** O tempo máximo que o comando de health check pode levar para ser executado. Se exceder, a verificação falha.
-   **`retries: 3`:** O número de vezes que uma verificação pode falhar consecutivamente antes que o contêiner seja considerado "não saudável" e o Swarm tome uma ação (geralmente reiniciar).
-   **`start_period: 60s`:** Um período de carência durante o qual as falhas do health check não contam para o número de `retries`. Isso dá tempo para o contêiner inicializar completamente (carregar a aplicação, conectar ao banco de dados, etc.) antes que as verificações comecem a ser rigorosas.

### Passo 2: Monitorando a Saúde dos Contêineres

Após o deploy, você pode monitorar o status de saúde dos seus serviços usando o comando `docker service ps`:

```bash
# Para ver o status de todos os serviços da stack agilizando
docker service ps agilizando

# Para ver detalhes de um serviço específico, incluindo o status do health check
docker inspect <ID_DO_CONTÊINER>
```

Na saída de `docker service ps`, você verá uma coluna `HEALTH` que indicará `starting`, `healthy` ou `unhealthy`.

## Próximo Passo e Verificação

1.  **Modificar `docker-swarm-prod.yml`:** Adicione as configurações de `healthcheck` aos serviços `agilizando-app` e `agilizando-worker`.
2.  **Deploy:** Atualize o stack em produção:
    ```bash
    docker stack deploy -c docker-swarm-prod.yml --with-registry-auth agilizando
    ```
3.  **Verificação:** Monitore o status de saúde dos seus serviços usando `docker service ps agilizando`.

Parabéns! Você agora tem um sistema de monitoramento de saúde robusto para seus contêineres, permitindo que o Docker Swarm gerencie sua aplicação de forma mais eficiente e resiliente.