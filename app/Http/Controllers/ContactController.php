<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact;
use App\Services\ContactService;
use App\Services\RecaptchaService;

use Illuminate\Support\Facades\Log; // criar logs

use App\Http\Requests\ContactStoreRequest;

class ContactController extends Controller
{
    private $contactService; // Declarar a variável para o service
    private $recaptchaService;

    public function __construct(ContactService $contactService, RecaptchaService $recaptchaService) // Injetar a dependência
    {
        $this->contactService = $contactService;
        $this->recaptchaService = $recaptchaService;
    }

    //falta testar
    public function store (ContactStoreRequest $request)
    { 
        
        try {

            $dataValidated = $request->validated();// ok recebendo o token
           // dd($dataValidated);            
            $response = $dataValidated['recaptchaToken']; //acessando token validado
          
            $remoteIp = $request->ip(); //pegar o ip do usuario 

            // Prepara os dados para a requisição à API reCAPTCHA
            $data = [
                'secret' => $this->recaptchaService->getSecretKey(), // Sua chave secreta do Google reCAPTCHA
                'response' => $response, // O token reCAPTCHA do formulário
                'remoteip' => $remoteIp, // O endereço IP do usuário
            ];

            //Faz uma requisição POST para a API de verificação 
            $response = $this->recaptchaService->verify($token, $data);
            dd($response );
            // Verifica se a requisição foi bem-sucedida
            if ($response->successful()) {
                               
                // Decodifica a resposta JSON da API
                $responseData = $response->json();

                // Verifica se a verificação foi bem-sucedida
                if (!$responseData['success']) {
                    return false; // A verificação falhou
                }

                // Recupera e retorna a pontuação (opcional)
                if (isset($responseData['score']) && $responseData['score'] > 0.5) { //1.0 muito bom // 0.0 um bot
                    // cria um contato se for maior que 0.5
                    $contact = $this->contactService->createContact($request);
                }
               
            } else {
                // reCAPTCHA verification failed, handle the error
                return back()->with('error', 'Erro na verificação reCAPTCHA. Tente novamente.');
            }
            
        } catch (\Exception $e) {

            Log::error($e->getMessage(), $e->getTrace());

            return to_route('site.index')->with('error', 'Sua mensagem nao foi enviada ligue 21-21-98176-0591!'); 
        }
    }
}
