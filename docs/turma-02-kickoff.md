# Rascunho de Trabalho: Início da Turma 02

## Contexto

Após o deploy inicial da aplicação, foi identificado um erro `Internal Server Error` ao tentar realizar o login. Esta investigação se tornou a primeira lição de depuração de infraestrutura para a Turma 02.

## Diagnóstico do Problema: Resolução de Nomes na Rede Docker

- **O Erro:** A aplicação não conseguia se conectar ao banco de dados (MySQL) e ao Redis. O log mostrava o erro `getaddrinfo for db-staging failed: Name does not resolve`.

- **A Causa Raiz:** A aplicação estava configurada (via `.env.production`) para procurar os serviços pelos nomes `db-staging` e `redis-staging`. No entanto, dentro do Docker Swarm, os serviços são nomeados com um prefixo da "stack" a que pertencem. A investigação no servidor de produção (`docker service ls`) revelou que os nomes corretos e completos dos serviços são:
    - **Banco de Dados:** `clubesiga-staging_db-staging`
    - **Redis:** `clubesiga-staging_redis-staging`

## Ação Corretiva (Executada no Servidor de Produção)

Para resolver o problema, as seguintes variáveis no arquivo `.env.production` (localizado no servidor) foram atualizadas para usar os nomes de serviço corretos:

```env
DB_HOST=clubesiga-staging_db-staging
REDIS_HOST=clubesiga-staging_redis-staging
```

*Nota: Um deploy subsequente é necessário para que o serviço da aplicação reinicie e leia estas novas configurações.*

---

## Backlog Inicial para a Turma 02

Com a aplicação estável, a missão da Turma 02 começa com foco em robustez e segurança:

1.  **[Issue #X] Criar Teste de Autenticação:**
    *   **Tarefa:** Desenvolver um teste de Feature (`AuthenticationTest.php`) que simule o login de um usuário. O teste deve validar tanto o sucesso (com credenciais corretas) quanto a falha (com credenciais incorretas). 
    *   **Objetivo:** Garantir que a funcionalidade de login nunca mais quebre silenciosamente.

2.  **[Issue #Y] Corrigir Vulnerabilidades de Segurança (NPM Audit):**
    *   **Tarefa:** Investigar as vulnerabilidades de segurança de criticidade "moderada" e "baixa" apontadas pelo `npm audit`.
    *   **Objetivo:** Aprender a gerenciar dependências, aplicar patches de segurança e usar testes como rede de segurança para evitar "breaking changes".
