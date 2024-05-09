<?php

namespace App\Services;

use Illuminate\Http\Request; //trabalhar com as requisicoes web 
use Illuminate\Support\Facades\Log; // criar logs

use App\Models\Contact; //importa o Model Contact

use Carbon\Carbon; //trabalhar com datas

/** classe para realizar tarefas relacionadas com Contato do site*/
class ContactService
{
    // declara a variavel com tipo sendo um Model
    private Contact $contact;
    
    // instuir o PHP a contruir a classe atribuindo o modelo importado  a variavel declarada
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }
    
    // cria um contato e retorna o contato criado
    public function createContact(Request $request): Contact
    {

        //validar os dados sempre se preferir pode usar um request personalizado, com regras e mensagens personalizadas
        $validated = $request->validate();

        // Obter o IP do cliente
        $ip = $request->ip();

        
        // sem que for realizar uma acao use try/catch 
        // tente fazer isso
        try {
            $newContact = $this->contact->create([
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'formMessage' => $validated['formMessage'],
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'ip' => $ip,
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