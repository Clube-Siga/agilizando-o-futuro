<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue; //Esta interface informa ao Laravel que este ouvinte deve ser colocado na fila para execução assíncrona, o que é uma boa prática para tarefas como envio de emails.
use Illuminate\Queue\InteractsWithQueue; // esta característica fornece funcionalidade para interagir com o sistema de filas (se você estiver usando um).
use App\Events\ContactCreatedEvent; // classe que você criou, que define o evento ao qual esse listener responderá.
use App\Mail\ContactReceiveidMail; // importar a classe de email a ser usado
use Illuminate\Support\Facades\Mail; // importar a facades 
use Illuminate\Support\Facades\Log;

class ContactCreatedListener implements ShouldQueue //implementar a interface
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event. este é o método principal do ouvinte que é chamado quando a ContactCreatedEvent é disparado.
     */
    public function handle(ContactCreatedEvent $event): void
    {
        Log::info('Listener: Recebendo ContactCreatedEvent: Contato Criado');
        $contact = $event->contact;
        dd($contact);
        // extrair os dados do contato
        $emailData = [
            'name' => $contact->name,
            'phone' => $contact->phone,
            'email' => $contact->email,
            'subject' => $contact->subject,
            'formMessage' => $contact->formMessage,
        ];

        // enviar o email para o sac
        Mail::to('agilizando@clubesiga.com.br')->send(new ContactReceiveidMail($emailData));
    }
}
