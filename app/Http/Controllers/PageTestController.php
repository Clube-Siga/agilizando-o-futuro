<?php

namespace App\Http\Controllers;
use Inertia\Inertia;


class PageTestController extends Controller
{
        public function index() 
        { 
            return Inertia::render('Agilizando/PageTest');
        }
}



