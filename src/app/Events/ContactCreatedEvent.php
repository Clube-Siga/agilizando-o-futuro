<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Contact;

class ContactCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $contact; // definir como public para facilitar o acesso do ouvinte.
    /**
     * Cria uma nova instância do evento..
     */
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }

    /**
     * Get the channels the event should broadcast on.
     * Obtém os canais nos quais o evento deve ser transmitido.
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // A transmissão não é necessária para envio de email, então removi
        return [
            //new PrivateChannel('contacts' . $this->contact->id),
        ];
    }
}
