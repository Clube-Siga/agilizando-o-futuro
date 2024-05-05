<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SiteController extends Controller
{
    
    public function index ()
    {
        //faltava passar a props na rendeizacao
        if (session()->has('message')) {
            $message = session()->pull('message'); // pega e remove a message da session
        } else {
            $message = null;
        }

        return Inertia::render('Agilizando/Home', [
            'message' => $message,
        ]);
    }
}
