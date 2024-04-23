<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Contact;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store (Request $request)
    {
        //dd($request);
        $validated = $request->validate([
            'email' => 'required|string|email|max:255',
            'subject' => 'required',
            'formMessage' => 'required|string|max:500',
        ]);
        
        // dados validados salvar no banco de dados
        $newContact = Contact::create([
            'email' => $validated['email'],
            'subject' =>$validated['subject'],
            'formMessage' => $validated['formMessage'],
        ]);
       
        if ($newContact ) {

            return Inertia::render('Agilizando/Home', [
                'message' => 'Sua mensagem foi enviada com sucesso!',
            ]);
        }

        return Inertia::render('Agilizando/Home', [
            'error' => 'Sua mensagem nao foi enviada ligue 21-21-98176-0591',
        ]);
    }
}
