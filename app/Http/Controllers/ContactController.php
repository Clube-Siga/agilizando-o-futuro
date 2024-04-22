<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store (Request $request)
    {
        $data = $request;

        return back()->with('Agilizando/Home', [
            'message' => 'Sua mensagem foi enviada com sucesso!',
        ]);
    }
}
