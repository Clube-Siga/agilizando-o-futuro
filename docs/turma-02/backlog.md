# Plano de Aula: Próximas Sprints da Turma 02

Este arquivo serve como nosso roteiro de ensino e planejamento para as próximas Sprints. Ele é um documento vivo e será atualizado conforme progredimos e identificamos novas necessidades de aprendizado baseadas nos desafios reais do projeto.

---

### Módulo 1: Turbinando o Ambiente de Desenvolvimento Local

**Objetivo:** Criar uma base de infraestrutura local sólida, compartilhada e fácil de usar, resolvendo problemas de configuração e permitindo que os alunos foquem no desenvolvimento da aplicação.

*   **Sprint 07: Possíveis Problemas e Soluções Encontradas pelos Alunos**
    *   **Problema:** Dificuldades na configuração e depuração do ambiente de desenvolvimento local, incluindo problemas de roteamento, extensões PHP, credenciais de banco de dados e permissões.
    *   **Objetivos:**
        *   Diagnosticar e resolver problemas comuns de ambiente Docker e Laravel Sail.
        *   Entender a interação entre Traefik, Laravel Sail e MySQL.
        *   Documentar soluções para problemas como "Page Not Found", "could not find driver", "Access denied" e "Table not found".

---

### Módulo 2: Otimização e Escalabilidade em Produção

**Objetivo:** Aplicar padrões de arquitetura avançados para melhorar a performance, segurança e resiliência da aplicação em produção.

*   **Sprint 08: Gerenciando Sessões com Redis**
    *   **Problema:** Perda de autenticação do usuário a cada deploy.
    *   **Objetivo:** Migrar o `SESSION_DRIVER` do Laravel para Redis.

*   **Sprint 09: Otimizando Filas com Redis e Workers**
    *   **Problema:** Sobrecarga do banco de dados com o processamento de filas.
    *   **Objetivo:** Implementar um serviço `worker` dedicado e usar Redis para filas.

*   **Sprint 10: Segurança Máxima - Produção 100% "Secretless"**
    *   **Problema:** Uso de arquivos `.env` em produção.
    *   **Objetivo:** Migrar todas as configurações para Docker Secrets e remover o `env_file`.

*   **Sprint 11: A Base Sólida - Volumes, Persistência e Permissões**
    *   **Problema:** Erros de permissão que surgem da interação entre diferentes usuários em diferentes imagens Docker.
    *   **Objetivos:**
        *   Dominar a diretiva `user:` e o mapeamento de `UID`/`GID`.
        *   Entender a diferença entre **bind mounts** e **volumes nomeados**.
        *   Garantir consistência de permissões entre o ambiente local e de produção.