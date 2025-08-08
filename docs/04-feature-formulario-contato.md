# Capítulo 5: A Vida - Implementando uma Feature Real

A teoria é fundamental, mas a mágica acontece quando aplicamos o conhecimento para construir algo real. Neste capítulo, vamos fazer um mergulho profundo no código e seguir o ciclo de vida completo de uma das features mais importantes do site: o **Formulário de Contato com verificação Google reCAPTCHA**.

## O Cenário

O objetivo é permitir que um visitante envie uma mensagem para o time do projeto, garantindo que o envio seja feito por um humano, e não por um robô de spam.

### Passo 1: O Frontend - A Interação do Usuário (React)

Tudo começa no arquivo `src/resources/js/Components/Agilizando/Partials/Contact/Contact.jsx`.

1.  **Gerenciamento do Formulário:** Usamos o hook `useForm` fornecido pelo Inertia.js. Ele é um "ajudante" que cuida do estado dos campos do formulário (nome, email, etc.), processa o envio e lida com os erros de validação que vêm do Laravel.

2.  **Ação de Envio:** Quando o usuário clica no botão "Enviar", nossa função `handleSubmit` é acionada.

3.  **Verificação reCAPTCHA:** Antes de enviar os dados para o nosso servidor, a função `handleSubmit` primeiro conversa com a API do Google reCAPTCHA. Ela pede um "token", que é uma prova temporária de que a interação parece ser humana. Esse token é adicionado aos dados do formulário.

### Passo 2: A Rota - O Endereço da Feature (Laravel)

Uma vez que o frontend tem os dados e o token, ele precisa de um endereço no backend para enviar essas informações. Essa definição está em `src/routes/web.php`:

```php
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```

Esta linha diz ao Laravel: "Qualquer requisição do tipo **POST** para a URL `/contact` deve ser manipulada pelo método `store` do `ContactController`."

### Passo 3: O Controlador - O Cérebro da Operação (Laravel)

O arquivo `src/app/Http/Controllers/ContactController.php` é onde a mágica acontece.

1.  **Validação dos Dados:** A primeira coisa que o método `store` faz é validar os dados recebidos. Ele usa uma classe dedicada, `ContactStoreRequest`, para garantir que campos como `name` e `email` foram preenchidos corretamente. Se a validação falhar, o Laravel automaticamente envia os erros de volta para o frontend, e o `useForm` do Inertia os exibe para o usuário.

2.  **Verificação do Token reCAPTCHA:** O controlador pega o token do reCAPTCHA que veio do formulário e, usando nosso `RecaptchaService`, pergunta à API do Google: "Este token é válido e a pontuação de 'humanidade' é boa?".

3.  **Salvando no Banco:** Se a resposta do Google for positiva, o controlador chama o `ContactService`, que tem a única responsabilidade de criar o registro no banco de dados. Ele executa o comando `Contact::create()`, que salva as informações na tabela `contacts` do nosso banco de dados MySQL.

4.  **Disparando um Evento:** Após salvar, o controlador dispara um evento, `ContactCreatedEvent`. Isso desacopla nosso código. Em vez de colocar a lógica de enviar um email de notificação aqui, nós apenas "avisamos" a aplicação que um contato foi criado. Outra parte do sistema, o `ContactCreatedListener`, ouve esse evento e cuida do envio do email. É uma arquitetura limpa e de fácil manutenção.

### Passo 4: O Feedback - A Resposta ao Usuário (Laravel + Inertia)

Após tudo dar certo, o controlador redireciona o usuário de volta para a página inicial com uma mensagem de sucesso:

```php
return to_route('site.index')->with('success', 'Sua mensagem foi enviada com sucesso!');
```

O Inertia.js entrega essa mensagem de `success` como uma "prop" para o frontend. Nosso componente React pode então exibir uma notificação amigável para o usuário, confirmando que sua mensagem foi recebida.

E assim, completamos o ciclo! Desde um clique no navegador até uma nova linha em nosso banco de dados, seguindo as melhores práticas de desenvolvimento.

---

*Próximo capítulo: [O Lançamento - Deploy em Produção](./05-deploy-em-producao.md)*
