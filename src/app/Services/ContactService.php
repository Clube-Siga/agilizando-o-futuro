<?php

namespace App\Services;

use Illuminate\Http\Request; //trabalhar com as requisicoes web
use Illuminate\Support\Facades\Log; // criar logs
use App\Events\ContactCreatedEvent;


use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact; //importa o Model Contact

use App\Http\Requests\ContactStoreRequest;
use Carbon\Carbon; //trabalhar com datas

class ContactService
{
    /**
     * Create a new class instance.
     */
    private Contact $contact;

    public function __construct(Contact $contact)
    {
        //
        $this->contact = $contact;
    }

    public function createContact(array $validated): Contact
    {
        try {

            $newContact = $this->contact->create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'formMessage' => $validated['formMessage'],
               // 'ip_address' => $validated['remoteIp'],
            ]);
            
            $ip = $validated['remoteIp'];

            // Disparar um evento Contato Criado
            //ContactCreatedEvent::dispatch($newContact);
            //event(new ContactCreatedEvent($newContact));

            // Registrar mensagem de log com o IP
            Log::info("Contato criado com sucesso! IP do cliente: {$ip}");
            return $newContact;

            //se nao conseguir  gera uma excecao, que tambem pode ser personalizada
        } catch (\Exception $e) {
            // Registrar mensagem de log com o erro e data/hora
            Log::error($e->getMessage() . ' - Falha na criação do contato em: ' . Carbon::now());

            // Lidar com o erro de forma apropriada
            // - Enviar mensagem de erro para o usuário
            // - Registrar o erro em um sistema de relatórios
            // - Realizar ações de recuperação (se possível)

            // **Exemplo de mensagem de erro para o usuário:**
            return response()->json(['error' => 'Falha ao criar o contato. Tente novamente mais tarde.'], 500);
        }
    }
}