# Sprint 08: Arquitetura Limpa na Prática - O Fluxo de Contato

## Objetivo da Sprint

Analisar e documentar o fluxo de ponta-a-ponta do formulário de contato, identificando as boas práticas de arquitetura de software utilizadas para que sirvam de modelo para futuros desenvolvimentos.

## Conceitos Chave

- **Separação de Responsabilidades (Separation of Concerns):** Cada classe no fluxo tem um trabalho único e bem definido.
- **Padrão de Eventos e Ouvintes (Event-Listener Pattern):** Ações são desacopladas, permitindo que o sistema seja extensível e a resposta ao usuário seja mais rápida.
- **Injeção de Dependência:** Os componentes (como os Services) são "injetados" nos Controllers, facilitando a testabilidade e a manutenção.
- **Processamento Assíncrono com Filas (`ShouldQueue`):** Tarefas lentas, como o envio de e-mails, são enviadas para uma fila para serem processadas em segundo plano, melhorando drasticamente a experiência do usuário.

## A Jornada do Formulário de Contato (Passo a Passo)

Este é o fluxo de dados e responsabilidades desde o envio do formulário até a notificação por e-mail.

### Passo 1: O Controller (`ContactController`) - O Porteiro
- **Responsabilidade:** Lidar com a requisição web, validar a entrada e orquestrar o processo.
- **Ações:**
  1. Recebe a requisição e aciona a validação via `ContactStoreRequest`.
  2. Invoca o `RecaptchaService` para verificação de segurança.
  3. Delega a criação do contato para o `ContactService`.
  4. Dispara o evento `ContactCreatedEvent` para notificar o resto do sistema.

### Passo 2: O Service (`ContactService`) - O Trabalhador
- **Responsabilidade:** Conter a lógica de negócio pura para a criação de um contato.
- **Ação:** Recebe os dados validados e os utiliza para criar um novo registro no banco de dados através do Model `Contact`.

### Passo 3: O Evento (`ContactCreatedEvent`) - O Mensageiro
- **Responsabilidade:** Atuar como um contêiner de dados para o evento que acabou de ocorrer.
- **Ação:** Carrega o objeto `$contact` que foi recém-criado para que os Listeners possam acessá-lo.

### Passo 4: O Listener (`ContactCreatedListener`) - O Especialista
- **Responsabilidade:** Reagir ao evento `ContactCreatedEvent`.
- **Ação:**
  1. Implementa `ShouldQueue` para executar de forma assíncrona.
  2. Recebe o evento, extrai os dados do contato.
  3. Invoca a `Facade` `Mail` para enviar um e-mail, utilizando a classe `ContactReceiveidMail`.

### Passo 5: O Mailable (`ContactReceiveidMail`) - O Carteiro
- **Responsabilidade:** Definir todos os aspectos do e-mail a ser enviado.
- **Ação:**
  1. Configura o assunto e o remetente no método `envelope()`.
  2. Define o template Markdown (`mail.contactReceived`) e os dados a serem passados para a view no método `content()`.

## Conclusão

A arquitetura do formulário de contato é um exemplo exemplar de código limpo, desacoplado e testável, servindo como um padrão ouro para o projeto.