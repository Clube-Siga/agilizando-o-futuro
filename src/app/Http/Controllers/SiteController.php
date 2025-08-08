<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


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

        $sitekey = config('services.google_recaptcha.site_key'); //recuperando configuracao

        $imgCtaUrl = asset('images/cta-agile-developers.png');

        //dd($imgCtaUrl);
        return Inertia::render('Agilizando/Home', [
            'message' => $message,
            'siteKey' => $sitekey,
            'imgCtaUrl' =>  $imgCtaUrl,
        ]);
    }

    public function terms()
    {
        return Inertia::render('Agilizando/Terms');
    }

    public function policies()
    {
        return Inertia::render('Agilizando/Policies');
    }

}
