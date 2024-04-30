<?php

namespace App\Http\Controllers;

use Inertia\Inertia;


class SiteController extends Controller{
    public function index()
    {

        return Inertia::render('Agilizando/Home');
    }
}
