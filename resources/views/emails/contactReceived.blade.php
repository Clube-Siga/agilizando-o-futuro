@component('mail::message')

# Aviso: Novo Contato Recebido

Prezado SAC,

Um novo contato foi recebido através do site Agilizando. Por favor, retorne o contato o mais breve possível.

## Dados do Contato

| Nome | Telefone | Email |
| ---- | -------- | ----- |
| {{ $emailData['name'] }} | {{ $emailData['phone'] }} | {{ $emailData['email'] }} |

## Mensagem

{{ $emailData['formMessage'] }}

Atenciosamente,

Equipe Agilizando

@endcomponent
