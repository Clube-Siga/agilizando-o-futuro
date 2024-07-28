<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        //verificar o tipo de usuario sendo cadastrado Teacher, Student
        if (isset($request->userType)) {
            $userType = $request->userType;
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'cpf' => 'required|cpf|unique:users',
            'date_of_birth' => 'required',
            'mobile' => 'required|celular_com_ddd|unique:users',
            'terms' => 'required|boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'cpf' => $request->cpf,
            'date_of_birth' => $request->date_of_birth,
            'mobile' => $request->mobile,
            'terms_accepted' => $request->terms,
        ]);
        //busca a funcao de acordo com o tipo do usuario
        $role = Role::where('name', $userType)->first();
            // se existir a funcao
            if ($role) {
                $user->assignRole($role); //atribuir ao usuario
            }
            
        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    //criar meto de adicao de funcao de acordo com a funcao escolhida na hora do cadastro
}
