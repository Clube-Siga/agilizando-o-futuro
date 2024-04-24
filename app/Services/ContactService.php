<?php

namespace App\Services;

use Illuminate\Http\Request; //trabalhar com as requisicoes web
use Illuminate\Support\Facades\Log; // criar logs

use App\Models\Contact; //importa o Model Contact

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

    public function createContact(Request $request): Contact
    {
        // Obter o IP do cliente
        $ip = $request->ip();

        //validar os dados sempre se preferir pode usar um request personalizado, com regras e mensagens personalizadas
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|regex:/^\([0-9]{2}\)\s?[0-9]{5}\-[0-9]{4}$/',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string',
            'formMessage' => 'required|string|max:500',
        ]);

        // sempre que for realizar uma acao use try/catch
        // tente fazer isso
        try {
            $newContact = $this->contact->create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'formMessage' => $validated['formMessage'],
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
