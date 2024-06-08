<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ContactController; //Controlado responsavel pelo form
use Illuminate\Mail\Mailables\Content;

Route::get('/', [SiteController::class, 'index'])->name('site.index');

Route::get('/couses/:id', function(){
    return Inertia::render('Agilizando/Content');
}
);

Route::get('/donation', [SiteController::class, 'donate'])->name('site.donate');

Route::get('/content/{id}', [SiteController::class, 'content'])->name('site.content');

// Formulario de Contato
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
//Route::post('/contato', [ContactController::class, 'store'])->middleware('recaptcha');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
