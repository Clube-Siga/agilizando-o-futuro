<?php

namespace App\Http\Controllers;

use Inertia\Inertia;


class SiteController extends Controller{
    public function index()
    {
        if(session()->has('massage')){
            $message = session()->pull('massage');
        }else {
            $message = null;
        }


        return Inertia::render('Agilizando/Home',[ 
            'message' => $message,
        ]);
       
    }
}
