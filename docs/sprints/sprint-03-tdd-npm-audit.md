# Sprint 03: TDD e Segurança - Corrigindo Vulnerabilidades NPM

## Bem-vindo à Sprint 03!

Nesta Sprint, vamos abordar um tópico crítico para qualquer desenvolvedor moderno: a **segurança de dependências**. Você aprenderá a identificar, analisar e corrigir vulnerabilidades em pacotes JavaScript, utilizando o TDD como sua principal ferramenta para garantir que as correções não introduzam novos problemas.

Ao final desta Sprint, você terá uma compreensão prática de como manter suas aplicações seguras e estáveis, mesmo ao lidar com atualizações que podem causar "breaking changes".

### Pré-requisitos:

Certifique-se de que concluiu as Sprints anteriores e que todos os seus testes estão passando:

*   [Sprint 01: Fundamentos de Testes e TDD - Autenticação](./sprint-01-tdd-autenticacao.md)
*   [Sprint 02: TDD na Prática - Funcionalidade de Registro](./sprint-02-tdd-registro.md)

---

## O Ciclo TDD: Red, Green, Refactor (Revisão)

Lembre-se dos passos:

1.  **Red (Vermelho):** Escreva um teste que falhe.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar.
3.  **Refactor (Refatorar):** Melhore o código com a confiança de que o teste o protegerá.

---

## Sua Missão: Auditoria e Correção de Vulnerabilidades NPM

No início da Turma 02, o GitHub Dependabot e o comando `npm audit` nos alertaram sobre vulnerabilidades em nossas dependências JavaScript. Agora é a hora de corrigi-las!

### Passo 1: Entendendo o Relatório de Auditoria

Primeiro, vamos rodar o comando `npm audit` para ver o relatório atual de vulnerabilidades. Certifique-se de estar no diretório `src`.

```bash
cd src && npm audit
```

**Análise:** O relatório listará as vulnerabilidades, sua severidade (baixa, moderada, alta, crítica) e, o mais importante, se a correção disponível (`npm audit fix --force`) envolve "breaking changes".

### Passo 2: A Estratégia TDD para Correções

Quando o `npm audit fix --force` indica "breaking changes", significa que a atualização pode quebrar funcionalidades existentes. É aqui que nossos testes entram em ação como uma **rede de segurança**.

**Nosso Plano:**

1.  **Verde (Inicial):** Rodar a suíte de testes completa *antes* de qualquer alteração para garantir que tudo está funcionando. (Você já fez isso ao final da Sprint 02).
2.  **Executar a Correção (Potencialmente Vermelho):** Aplicar o `npm audit fix --force`. Isso pode fazer com que alguns testes falhem (fiquem vermelhos), indicando que a atualização quebrou algo.
3.  **Refatorar (Voltar ao Verde):** Corrigir o código da aplicação que foi quebrado pela atualização, fazendo com que os testes voltem a passar.

### Passo 3: Executando a Correção

Certifique-se de que todos os seus testes estão passando (rode `cd src && php artisan test`). Se estiverem, execute o comando de correção:

```bash
cd src && npm audit fix --force
```

**Atenção:** Este comando pode levar algum tempo e pode exibir avisos sobre as "breaking changes".

### Passo 4: Verificando as Quebras (O "Red" Pós-Correção)

Após a execução do `npm audit fix --force`, rode a suíte de testes completa novamente:

```bash
cd src && php artisan test
```

**Resultado Esperado:** É possível que alguns testes falhem. Essas falhas indicarão exatamente quais partes da aplicação foram afetadas pelas atualizações de dependência. Cada falha é um "Red" que você precisa transformar em "Green".

### Passo 5: Refatorando para o Verde (O "Green" Pós-Correção)

Para cada teste que falhou no Passo 4:

1.  **Analise a Falha:** Entenda o que a atualização quebrou. Pode ser uma mudança na API de uma biblioteca, um comportamento diferente, etc.
2.  **Corrija o Código:** Modifique o código da sua aplicação (não o teste, a menos que o teste esteja incorreto) para se adaptar à nova versão da dependência.
3.  **Rode o Teste:** Execute o teste específico que você está corrigindo para garantir que ele passe.

Repita este processo até que todos os testes voltem a passar.

### Passo 6: Verificação Final

Quando você acredita que todas as correções foram feitas, rode a suíte de testes completa uma última vez:

```bash
cd src && php artisan test
```

**Resultado Esperado:** Todos os testes devem passar (verde).

---

## Conclusão da Sprint 03

Parabéns! Você concluiu a Sprint 03. Você aprendeu a:

*   Utilizar o `npm audit` para identificar vulnerabilidades.
*   Aplicar correções de segurança em dependências.
*   Usar sua suíte de testes como uma rede de segurança para lidar com "breaking changes".
*   Refatorar o código da aplicação para se adaptar a novas versões de dependências.

No próximo Sprint, abordaremos a criação de testes para outras funcionalidades ou a integração com ferramentas de IA.
