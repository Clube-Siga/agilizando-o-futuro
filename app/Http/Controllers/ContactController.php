<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store (Request $request)
    {
        dd($request);
        return Inertia::render('Contact', [
            'message' => 'Sua mensagem foi enviada com sucesso!',
        ]);
    }
}
