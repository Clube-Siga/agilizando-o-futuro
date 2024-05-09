<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact;
use App\Services\ContactService;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    private $contactService; // Declarar a variável para o service

    public function __construct(ContactService $contactService) // Injetar a dependência
    {
        $this->contactService = $contactService;
    }

    public function store (Request $request)
    { 

       //programacao orientada a objeto passa a responsabilidade de criar um contato para classe de servico
        $newContact = $this->contactService->createContact($request);

        if ($newContact ) {

            return to_route ('site.index') ->with( 'message', 'Sua mensagem foi enviada com sucesso!');
                
        }

        return to_route('site.index')->with( 'error', 'Sua mensagem nao foi enviada ligue 21-21-98176-0591');
    }
}
