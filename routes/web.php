<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PageTestController;

use App\Http\Controllers\ContactController; //Controlado responsavel pelo form

use Inertia\Inertia;


Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Agilizando/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/teste', function () {
    return Inertia::render('Agilizando/PageTest', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::get('/', function () {
//    return Inertia::render('Agilizando/Home', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
Route::get('/', [SiteController::class, 'index'])->name('site.index');

Route::get('/teste', [PageTestController::class, 'index'])->name('pagetest.index');

// Formulario de Contato
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/contato', [ContactController::class, 'store'])->middleware('recaptcha');



require __DIR__.'/auth.php';
