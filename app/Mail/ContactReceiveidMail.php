<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactReceiveidMail extends Mailable
{
    use Queueable, SerializesModels;

    public $emailData;

    /**
     * Create a new message instance. 
     */
    public function __construct(array $emailData) //recebe os dados extraido no listener
    {

        $this->emailData = $emailData; 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Novo Contato do Site Agilizando - ' . $this->emailData['name'], // personaliza seu objeto
            from: new Address('noreply@clubesiga.com.br', 'Clube Siga'), // Remetente aqui email do sistema
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {   //passa o endereco do modelo de template da view do email explicitando o uso do markdown
        return new Content(
            markdown: 'mail.contactReceived', // Utilize "view" para templates blades html
            with: [ // Mantenha os dados do emailData aqui
                'emailData' => $this->emailData, // Utilize "emailData" como chave para os dados
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
