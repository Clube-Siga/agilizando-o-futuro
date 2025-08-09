# Sprint 15: Engenharia de Prompt Avançada e Parâmetros de Geração do Gemini

## Objetivo da Sprint

Aprofundar nas técnicas de Engenharia de Prompt, explorando como formular instruções complexas e utilizar os parâmetros de geração específicos do Gemini para obter respostas mais precisas, controladas e úteis. O foco será em otimizar a interação para casos de uso em engenharia de software.

## Conceitos Chave

- **Engenharia de Prompt:** A arte e a ciência de criar instruções (prompts) eficazes para modelos de linguagem, visando obter as respostas desejadas.
- **Parâmetros de Geração (Generation Parameters):** Controles que permitem ajustar o comportamento do modelo durante a geração da resposta, influenciando a criatividade, a diversidade e a qualidade.
- **Saída Estruturada:** A capacidade de guiar o modelo para gerar respostas em formatos específicos (JSON, YAML, XML), essencial para automação e integração programática.
- **Gerenciamento de Contexto:** Manter a relevância em conversas multi-turn, garantindo que o modelo entenda o histórico da interação.

## A Jornada da Implementação (Passo a Passo)

### Passo 1: Estratégias de Prompt Avançadas

Além de prompts diretos, podemos usar técnicas para guiar o Gemini a um resultado mais específico.

1.  **Role-Playing (Definição de Papel):** Peça ao Gemini para assumir um papel específico.
    ```bash
    gemini generate-content "Atue como um engenheiro de DevOps sênior. Explique a importância de pipelines de CI/CD para um desenvolvedor júnior."
    ```
    **Benefício:** A resposta será formatada e terá o tom de um especialista na área.

2.  **Few-Shot Prompting (Exemplos):** Forneça exemplos de entrada e saída desejada para guiar o modelo.
    ```bash
    gemini generate-content "Converta o texto para JSON:
    Entrada: Nome: João, Idade: 30
    Saída: {"nome": "João", "idade": 30}
    Entrada: Linguagem: Python, Versão: 3.9
    Saída: {"linguagem": "Python", "versao": "3.9"}
    Entrada: Framework: Laravel, Versão: 10
    Saída: "
    ```
    **Benefício:** Ajuda o modelo a entender o formato e o estilo desejado, especialmente para saídas estruturadas.

3.  **Chain-of-Thought Prompting (Raciocínio Passo a Passo):** Peça ao Gemini para pensar em voz alta ou detalhar o raciocínio antes da resposta final.
    ```bash
    gemini generate-content "Pense passo a passo. Qual a melhor forma de otimizar uma query SQL lenta?"
    ```
    **Benefício:** Pode levar a respostas mais detalhadas, lógicas e precisas, especialmente para problemas complexos.

### Passo 2: Parâmetros de Geração (Generation Parameters)

O Gemini CLI permite ajustar parâmetros que controlam a geração da resposta. Estes são cruciais para refinar o comportamento do modelo.

1.  **`--temperature` (Criatividade):** Controla a aleatoriedade da saída. Valores mais altos (ex: 1.0) resultam em respostas mais criativas e variadas; valores mais baixos (ex: 0.2) tornam a saída mais focada e determinística.
    ```bash
    # Resposta mais criativa
    gemini generate-content --temperature 0.9 "Escreva um slogan para uma empresa de tecnologia inovadora."

    # Resposta mais direta e focada
    gemini generate-content --temperature 0.1 "Qual a sintaxe básica de um loop for em Python?"
    ```

2.  **`--top-p` (Diversidade de Palavras):** Controla a diversidade de palavras consideradas para a próxima palavra na sequência. Valores mais baixos restringem a escolha a palavras mais prováveis.
    ```bash
    # Exemplo (uso combinado com temperature)
    gemini generate-content --temperature 0.7 --top-p 0.8 "Descreva um cenário futurista de desenvolvimento de software."
    ```

3.  **`--top-k` (Qualidade de Palavras):** Limita a escolha da próxima palavra às `k` palavras mais prováveis. Útil para evitar palavras muito incomuns ou irrelevantes.
    ```bash
    # Exemplo (uso combinado)
    gemini generate-content --temperature 0.5 --top-k 40 "Gere uma lista de 5 ferramentas de CI/CD populares."
    ```

### Passo 3: Saída Estruturada para Automação

Para integrar o Gemini em scripts e automações, a saída estruturada é indispensável. Além da flag `--json` (vista na Sprint 14), você pode guiar o modelo com o prompt.

1.  **Solicitando JSON no Prompt:**
    ```bash
    gemini generate-content "Gere um JSON com informações de um usuário: nome, email e idade. Formato: {"nome": "<nome>", "email": "<email>", "idade": <idade>}"
    ```
    **Benefício:** Mesmo sem a flag `--json`, o modelo tentará seguir o formato. Combinar a flag com o prompt é o ideal.

2.  **Solicitando YAML ou XML:**
    ```bash
    gemini generate-content "Gere um YAML para uma configuração de pipeline de CI/CD simples com 2 estágios: build e deploy."
    ```

### Passo 4: Gerenciamento de Contexto (Multi-Turn Conversations)

Para conversas mais longas, o Gemini CLI permite passar o histórico da conversa para manter o contexto.

```bash
# Primeira interação
RESPONSE1=$(gemini generate-content --json "Qual a capital do Brasil?")

# Segunda interação, passando a primeira resposta como contexto
RESPONSE2=$(gemini generate-content --json --history "user: Qual a capital do Brasil?\nmodel: Brasília" "E qual a capital da Argentina?")
```

**Explicação:** A flag `--history` permite que você forneça pares de `user: <prompt>` e `model: <resposta>` para simular o histórico da conversa. Isso é vital para que o Gemini mantenha o contexto em interações complexas.

## Próximo Passo e Verificação

1.  **Experimente as Estratégias de Prompt:** Teste o role-playing, few-shot e chain-of-thought com diferentes cenários.
2.  **Ajuste os Parâmetros de Geração:** Brinque com `--temperature`, `--top-p` e `--top-k` para ver como eles afetam a saída do Gemini.
3.  **Gere Saídas Estruturadas:** Pratique a geração de JSON, YAML e outros formatos, e use `jq` para parseá-los.
4.  **Simule Conversas Multi-Turn:** Use a flag `--history` para manter o contexto em interações mais longas.

Parabéns! Você agora domina técnicas avançadas de Engenharia de Prompt e sabe como ajustar os parâmetros de geração do Gemini para obter resultados mais eficientes e controlados. Isso é um diferencial enorme para integrar IA em seus fluxos de trabalho de engenharia.
