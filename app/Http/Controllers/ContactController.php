<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact;
use App\Services\ContactService;
use App\Services\RecaptchaService;

use Illuminate\Support\Facades\Log; // criar logs
use Illuminate\Support\Facades\Http; // metodos prontos

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
    public function store(ContactStoreRequest $request)
    { 
        try {
            $dataValidated = $request->validated(); // Validando e recebendo o token
            $responseToken = $dataValidated['recaptchaToken']; // Acessando token validado
            $remoteIp = $request->ip(); // Pegar o IP do usuário
    
            // Prepara os dados para a requisição à API reCAPTCHA
            $recaptchaData = [
                'secret' => config('services.google_recaptcha.secret_key'), // Sua chave secreta do Google reCAPTCHA
                'response' => $responseToken, // O token reCAPTCHA do formulário
                'remoteip' => $remoteIp, // O endereço IP do usuário
            ];
    
            // Faz uma requisição POST para a API de verificação do reCAPTCHA
            $response = $this->recaptchaService->verify($recaptchaData);
           
            // Verifica se a requisição foi bem-sucedida
            if ($response->successful()) {
                $responseData = $response->json(); // Decodifica a resposta JSON da API
               dd( $responseData ); 
                if (isset($responseData['success']) && $responseData['success']) {
                    // A verificação do reCAPTCHA foi bem-sucedida
                    
                    if (isset($responseData['score']) && $responseData['score'] > 0.5) {
                        // Cria um contato se a pontuação for maior que 0.5
                        $contact = $this->contactService->createContact($dataValidated);
    
                        return back()->with('success', 'Contato enviado com sucesso.');
                    } else {
                        return back()->with('error', 'A verificação reCAPTCHA falhou. Por favor, tente novamente.');
                    }
                } else {
                    return back()->with('error', 'A verificação reCAPTCHA falhou. Por favor, tente novamente.');
                }
            } else {
                return back()->with('error', 'Erro na verificação reCAPTCHA. Tente novamente.');
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage(), $e->getTrace());
    
            return redirect()->route('site.index')->with('error', 'Sua mensagem não foi enviada. Por favor, ligue 21-21-98176-0591!');
        }
    }
}