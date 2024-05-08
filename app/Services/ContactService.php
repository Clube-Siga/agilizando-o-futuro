<?php

namespace App\Services;

use Illuminate\Http\Request; //trabalhar com as requisicoes web
use Illuminate\Support\Facades\Log; // criar logs

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

    public function createContact(ContactStoreRequest $request): Contact
    {
        // Obter o IP do cliente
        $ip = $request->ip();

        $validated = $request->validated();//faltava essa linha pegando os dados validados

        // sempre que for realizar uma acao use try/catch
        // tente fazer isso
        try {
            $newContact = $this->contact->create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'formMessage' => $validated['formMessage'],
                'ip_address' => $ip,
            ]);

            // Registrar mensagem de log com o IP
            Log::info("Contato criado com sucesso! IP do cliente: {$ip}");
            return $newContact;

            //se nao conseguir  gera uma excecao, que tambem pode ser personalizada
        } catch (\Exception $e) {
            // trate o erro, grave um log, envia pro front, so nao deixa ele estourar na tela do usuario
            // sistema bom nao para de funcionar nunca, e podemos corrigir e controlar suas falhas.
           //exemplo: criando um log de erro e registrando a data e hora
           Log::error($e->getMessage() . ' - Falha na criação do contato em: ' . Carbon::now());

            throw $e;
        }
    }
}