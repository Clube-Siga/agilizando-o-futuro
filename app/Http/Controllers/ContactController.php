<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Support\Facades\Log; // criar logs

use App\Http\Requests\ContactStoreRequest;

class ContactController extends Controller
{
    private $contactService; // Declarar a variável para o service

    public function __construct(ContactService $contactService) // Injetar a dependência
    {
        $this->contactService = $contactService;
    }

    
    public function store (ContactStoreRequest $request)
    { 
        //programacao orientada a objeto passa a responsabilidade de criar um contato para classe de servico
        
        // sempre que for realizar uma acao use try/catch
        // tente fazer isso
        try {
            // Log request details
            Log::info("Request received: ", $request->all());

            // Log service method invocation
            Log::info("Calling createContact() with request: ", $request->all());

            // Create the contact using the service
            $newContact = $this->contactService->createContact($request);

            if ($newContact) {
                // Log successful contact creation
                Log::info("Contact created successfully: ");

                // Redirect with success message
                return to_route('site.index')->with('message', 'Sua mensagem foi enviada com sucesso!');
            } 

            // Handle failed contact creation
            Log::error("Failed to create contact: ", $e->getMessage());

            // Return with error message
            return to_route('site.index')->with('error', 'Sua mensagem nao foi enviada ligue 21-21-98176-0591!'); 
        } catch (\Exception $e) {

            // Log exception details
            Log::error($e->getMessage(), $e);

            // Handle specific errors based on exception type or details (optional)
            if ($e instanceof InvalidArgumentException) {
                Log::error("Invalid argument error: ", $e->getMessage());
                return to_route('site.index')->with('error', 'Invalid data provided. Please check your input.');
            } else if ($e instanceof PermissionDeniedException) {
                Log::error("Permission denied error: ", $e->getMessage());
                return to_route('site.index')->with('error', 'You do not have permission to perform this action.');
            }

            // Return generic error message if specific handling not implemented
            return to_route('site.index')->with('error', 'An unexpected error occurred. Please try again later.');
        }
    }
}
