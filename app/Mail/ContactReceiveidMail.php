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

    /**
     * Create a new message instance. 
     */
    public function __construct(array $emailData) //recebe os dados extraido no listener
    {
        dd( $emailData);
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
    {   //passa o endereco do modelo de template da view do email
        return new Content(
            view: 'view.emails.contact-receveid',
            data: $this->emailData, // passar os dados do contato para o template
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
