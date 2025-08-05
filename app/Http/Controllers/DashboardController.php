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
        $user = Auth::user(); //pega o usuario autenticado
        // verifica qual funcao ele tem e chama o metodo de acordo com a funcao.
        if ($user->hasRole('Admin')) {
            return $this->dashAdmin();
        } elseif ($user->hasRole('Student')) {
            return $this->dashStudent();
        } elseif ($user->hasRole('Teacher')) {
            return $this->dashTeacher();
        }  
        return abort(403, 'Acesso proibido');
    }
    
    // Falta Criar a Dash do Admin
    private function dashAdmin() {
    
        return Inertia::render('Dashboard/DashAdmin');
    }
    
    // Falta Criar a Dash do Aluno
    private function dashStudent() {
        return Inertia::render('Dashboard/DashStudent');
    }
    
    // Falta Criar a Dash do Professor
    private function dashTeacher() {
        return Inertia::render('Dashboard/DashTeacher');
    }
}
