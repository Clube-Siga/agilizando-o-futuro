# Sprint 14: Introdução ao Gemini CLI e Modelos de IA

## Objetivo da Sprint

Nesta Sprint, você aprenderá a instalar, configurar e utilizar o Gemini Command Line Interface (CLI) para interagir diretamente com os modelos de IA do Google. Além disso, entenderá a importância de escolher o modelo de IA mais adequado para cada tarefa, otimizando seus resultados.

## Conceitos Chave

-   **Gemini CLI:** Uma ferramenta de linha de comando que permite interagir com os modelos Gemini e outros modelos de IA do Google de forma programática e eficiente.
-   **Modelos de IA (Gemini):** Diferentes versões ou especializações dos modelos Gemini, otimizados para tipos específicos de entrada (texto, imagem, vídeo) e tarefas.
    -   `gemini-pro`: O modelo mais versátil, otimizado para tarefas de texto, como geração de conteúdo, sumarização, tradução e raciocínio.
    -   `gemini-pro-vision`: Um modelo multimodal que aceita texto e imagens como entrada, ideal para tarefas que envolvem compreensão visual e textual.
-   **Autenticação:** O processo de verificar sua identidade e autorizar o acesso à API do Google AI, geralmente via uma chave de API.

## A Jornada da Implementação (Passo a Passo)

### Passo 1: Instalação e Configuração do Gemini CLI

O Gemini CLI é uma ferramenta Python e pode ser instalada via `pip`.

1.  **Pré-requisitos:** Certifique-se de ter o Python 3.9 ou superior e `pip` instalados.

2.  **Instalação:**
    ```bash
    pip install google-generativeai
    ```

3.  **Configuração da Chave de API:**
    Você precisará de uma chave de API do Google AI Studio. Se ainda não tem uma, crie em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).

    A forma mais segura e recomendada para configurar a chave é via variável de ambiente:
    ```bash
    export GOOGLE_API_KEY="SUA_CHAVE_DE_API_AQUI"
    ```
    Para persistir essa configuração, adicione a linha ao seu `~/.bashrc`, `~/.zshrc` ou `~/.profile`.

    Alternativamente, você pode configurar a chave diretamente no código Python ou em um arquivo de configuração, mas a variável de ambiente é preferível para segurança em ambientes de desenvolvimento e produção.

### Passo 2: Interagindo com o Gemini CLI - Geração de Conteúdo

O comando principal para interagir com o Gemini é `gemini generate-content`.

1.  **Geração de Texto Básico:**
    ```bash
    gemini generate-content "Me conte uma piada sobre programação."
    ```
    **Explicação:** Este comando envia o prompt para o modelo `gemini-pro` (padrão) e imprime a resposta diretamente no terminal.

2.  **Especificando o Modelo:**
    Embora `gemini-pro` seja o padrão para texto, você pode explicitamente especificá-lo:
    ```bash
    gemini generate-content --model gemini-pro "Qual a capital da França?"
    ```

3.  **Entrada de Múltiplas Linhas (para Prompts Maiores):**
    Para prompts mais complexos, você pode usar aspas simples e quebras de linha, ou redirecionar de um arquivo.
    ```bash
    gemini generate-content 'Escreva um pequeno poema sobre a beleza do código limpo, em 4 versos.'
    ```

4.  **Saída em JSON (para Automação):**
    Para integrar o Gemini em scripts e automações, a saída em JSON é essencial. Use a flag `--json`.
    ```bash
    gemini generate-content --json "Gere um JSON com um array de 3 linguagens de programação populares, cada uma com 'nome' e 'ano_lancamento'."
    ```
    **Explicação:** A saída será um JSON que você pode parsear em seus scripts Python, Node.js, Bash, etc.

### Passo 3: Entendendo e Escolhendo Modelos de IA

A escolha do modelo é crucial para a eficiência e o custo. O Gemini oferece modelos otimizados para diferentes tipos de dados e tarefas.

1.  **`gemini-pro` (Texto):**
    -   **Uso:** Geração de texto, sumarização, tradução, brainstorming, escrita criativa, raciocínio lógico.
    -   **Exemplo:** Gerar um README para um projeto, escrever um e-mail, responder a perguntas.

2.  **`gemini-pro-vision` (Multimodal - Texto e Imagem):**
    -   **Uso:** Análise de imagens, descrição de cenas, responder perguntas sobre imagens, combinar informações textuais e visuais.
    -   **Exemplo:** Descrever o conteúdo de uma imagem, identificar objetos em uma foto, gerar legendas para imagens.
    -   **Como usar (exemplo com imagem local):**
        ```bash
        gemini generate-content --model gemini-pro-vision --image /caminho/para/sua/imagem.jpg "Descreva o que você vê nesta imagem e sugira um título criativo."
        ```
        **Explicação:** A flag `--image` permite passar o caminho para um arquivo de imagem local. O Gemini CLI enviará a imagem junto com o prompt textual.

### Passo 4: Interpretando a Saída do CLI

Ao usar o Gemini CLI, a saída pode variar. Para prompts simples, você obterá texto puro. Para prompts que solicitam JSON ou com a flag `--json`, a saída será estruturada.

-   **Texto Puro:** Fácil de ler, ideal para interações rápidas.
-   **JSON:** Essencial para automação. Você precisará de ferramentas como `jq` (para Bash) ou bibliotecas de parsing JSON (em Python, Node.js) para extrair informações programaticamente.

    **Exemplo de uso com `jq`:**
    ```bash
    gemini generate-content --json "Gere um JSON com um array de 1 objeto, com chave 'nome' e valor 'João'." | jq -r '.candidates[0].content.parts[0].text'
    ```
    **Explicação:** `jq -r '.candidates[0].content.parts[0].text'` extrai o texto gerado do JSON de resposta do Gemini.

## Próximo Passo e Verificação

1.  **Instale o Gemini CLI:** Siga as instruções do Passo 1.
2.  **Obtenha sua Chave de API:** Configure a variável de ambiente `GOOGLE_API_KEY`.
3.  **Experimente os Comandos:** Teste os comandos `gemini generate-content` com diferentes prompts e modelos.
4.  **Teste a Saída JSON:** Tente gerar um JSON e parseá-lo com `jq` ou sua linguagem de programação preferida.

Parabéns! Você deu os primeiros passos na interação direta com os modelos Gemini, abrindo um mundo de possibilidades para automação e integração de IA em seus projetos.