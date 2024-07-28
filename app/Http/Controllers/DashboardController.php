<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


//Controlador responsavel por identificar a funcao do usuario e  
// fazer o redirecionamento correto para rota da Dash
class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return $this->dashAdmin();
        } elseif ($user->hasRole('Student')) {
            return $this->dashStudent();
        } elseif ($user->hasRole('Teacher')) {
            return $this->dashTeacher();
        }  
        return abort(403, 'Acesso proibido');
    }

    private function dashAdmin() {
    
        return Inertia::render('Dashboard');
    }

    private function dashStudent() {
        return Inertia::render('Dashboard');
    }

    private function dashTeacher() {
        return Inertia::render('Dashboard');
    }
}
