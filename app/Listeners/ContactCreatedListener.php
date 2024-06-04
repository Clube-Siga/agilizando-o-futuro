<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\ContactCreatedEvent;
use Illuminate\Support\Facades\Log;

class ContactCreatedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ContactCreatedEvent $event): void
    {
        $newContact = $event->contact;
        Log::info('Listener: ContactCreatedEvent: Contato Criado');
    }
}
