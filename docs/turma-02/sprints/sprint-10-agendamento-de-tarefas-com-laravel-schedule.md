# Sprint 10: Agendamento de Tarefas com Laravel Schedule

## Objetivo da Sprint

Automatizar a execução de tarefas rotineiras em nossa aplicação Laravel utilizando o sistema de agendamento (`schedule`) do framework. Isso nos permitirá executar comandos em intervalos definidos, como limpeza de cache, envio de relatórios, etc.

## Conceitos Chave

-   **Laravel Schedule:** Uma forma programática e expressiva de definir a frequência de execução de comandos Artisan ou chamadas a métodos dentro da sua aplicação.
-   **Cron Job:** Um utilitário em sistemas Unix-like que permite agendar a execução de comandos ou scripts em horários ou intervalos específicos. O Laravel Schedule utiliza um único cron job para "disparar" todos os agendamentos definidos na aplicação.

## A Jornada da Implementação (Passo a Passo)

Para que o Laravel Schedule funcione em um ambiente Docker, precisamos de duas coisas:

1.  Definir as tarefas agendadas no Laravel.
2.  Configurar um cron job no contêiner para executar o comando `php artisan schedule:run`.

### Passo 1: Definindo as Tarefas no Laravel

Todas as tarefas agendadas são definidas no método `schedule` do arquivo `app/Console/Kernel.php`.

Vamos adicionar um comando de exemplo que será executado a cada minuto.

**Código Sugerido (`src/app/Console/Kernel.php`):**

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule):
    {
        // Exemplo: Limpar o cache a cada minuto (apenas para demonstração)
        $schedule->command('cache:clear')->everyMinute();

        // Exemplo: Um comando customizado que você pode criar
        // $schedule->command('app:daily-report')->dailyAt('05:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

```

### Passo 2: Configurando o Cron Job no Contêiner Docker

Para que o Laravel Schedule funcione, precisamos que o comando `php artisan schedule:run` seja executado periodicamente. Em um ambiente Docker, isso é feito adicionando um cron job ao contêiner da aplicação.

Vamos modificar o `Dockerfile` para incluir o `cron` e configurar um cron job que executa o `schedule:run` a cada minuto.

**Código Sugerido (`docker/Dockerfile`):**

```dockerfile
# ... (parte superior do Dockerfile, sem alterações) ...

# Instala o cron
RUN apt-get update && apt-get install -y cron

# Adiciona o cron job para o Laravel Schedule
COPY docker/cron/laravel-schedule /etc/cron.d/laravel-schedule
RUN chmod 0644 /etc/cron.d/laravel-schedule
RUN crontab /etc/cron.d/laravel-schedule

# ... (resto do Dockerfile, sem alterações) ...
```

Você precisará criar o arquivo `docker/cron/laravel-schedule` com o seguinte conteúdo:

**Conteúdo Sugerido (`docker/cron/laravel-schedule`):**

```
* * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1
```

### Explicação Detalhada

-   **`RUN apt-get install -y cron`:** Instala o serviço `cron` dentro da imagem Docker.
-   **`COPY docker/cron/laravel-schedule /etc/cron.d/laravel-schedule`:** Copia o arquivo de configuração do nosso cron job para o diretório de cron jobs do sistema.
-   **`chmod 0644 /etc/cron.d/laravel-schedule`:** Define as permissões corretas para o arquivo do cron job.
-   **`crontab /etc/cron.d/laravel-schedule`:** Carrega o cron job para o sistema `cron`.
-   **`* * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1`:** Este é o cron job em si:
    -   `* * * * *`: Executa a cada minuto.
    -   `cd /var/www/app`: Navega para o diretório raiz da aplicação Laravel dentro do contêiner.
    -   `php artisan schedule:run`: Executa o comando do Laravel que verifica e dispara as tarefas agendadas.
    -   `>> /dev/null 2>&1`: Redireciona a saída padrão e de erro para `/dev/null`, evitando que o cron encha os logs com saídas desnecessárias.

## Próximo Passo e Verificação

1.  **Modificar `src/app/Console/Kernel.php`:** Adicione o comando `cache:clear` ou outro comando de teste.
2.  **Criar `docker/cron/laravel-schedule`:** Crie o arquivo com o conteúdo sugerido.
3.  **Modificar `docker/Dockerfile`:** Adicione as linhas para instalar e configurar o cron.
4.  **Reconstruir a Imagem Docker:** Como o `Dockerfile` foi alterado, você precisará reconstruir a imagem da sua aplicação e fazer o push para o `ghcr.io`.
5.  **Deploy:** Atualize o stack em produção:
    ```bash
    docker stack deploy -c docker-swarm-prod.yml --with-registry-auth agilizando
    ```
6.  **Verificação:** Monitore os logs do serviço `agilizando-app` (ou do worker, se você decidir que o schedule deve rodar lá) para ver o comando `cache:clear` sendo executado a cada minuto.
    ```bash
    docker service logs -f agilizando_app
    ```

Parabéns! Você agora tem um sistema de agendamento de tarefas robusto e automatizado em seu ambiente de produção.