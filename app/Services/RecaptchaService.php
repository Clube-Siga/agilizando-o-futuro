<?php

namespace App\Services;

use Illuminate\Http\Request; //trabalhar com as requisicoes web
use Illuminate\Http\Client\Response; // Para fazer requisições HTTP
use Illuminate\Support\Facades\Http; // metodos prontos

class RecaptchaService
{
    // URL base para o endpoint de verificação do Google reCAPTCHA
    protected $baseUrl;

    // Sua chave de site do Google reCAPTCHA
    protected $siteKey;

    // Sua chave secreta do Google reCAPTCHA (para verificação)
    protected $secretKey;

    // O token reCAPTCHA recebido do formulário
    protected $token;

    // O endereço IP do usuário
    protected $remoteIp;

    /**
     * Construtor do serviço Recaptcha.
     *
     * Este construtor injeta as dependências necessárias para o serviço funcionar 
     * e inicializa as propriedades da classe com valores de configuração.
     */
    public function __construct()
    {

        // Recupera os valores de configuração do Laravel
        $this->baseUrl = config('services.google_recaptcha.url');
        $this->siteKey = config('services.google_recaptcha.site_key');
        $this->secretKey = config('services.google_recaptcha.secret_key');
    }

    /**
     * Retorna a Chave Secreta configurada do reCAPTCHA.
     *
     * @param string $secretKey O token reCAPTCHA.
     * 
     * Se bem-sucedido, secret sera retornada - Teste em 27-05-2024 - ok.
     */
    public function getSecretKey(): string
    {
        // Retorna a secret 
        return  $this->secretKey;
    }

    /**
     * Retorna a Chave Secreta configurada do reCAPTCHA.
     *
     * @param string $siteKey O token reCAPTCHA.
     * 
     * Se bem-sucedido, Site Key sera retornada - Teste em 27-05-2024 - ok.
     */
    public function getSiteKey(): string
    {
        // Retorna a secret 
        return  $this->siteKey;
    }

    /**
     * Retorna a Chave Secreta configurada do reCAPTCHA.
     *
     * @param string $baseUrl O token reCAPTCHA.
     * 
     * Se bem-sucedido, Site Key sera retornada - Teste em 27-05-2024 - ok.
     */
    public function getBaseUrl(): string
    {
        // Retorna a secret 
        return  $this->baseUrl;
    }

    /**
     * Faz uma requisição POST para a API de verificação do Google reCAPTCHA.
     *
     * @param string $token O token reCAPTCHA para verificação.
     * @param array $data Os dados a serem enviados no corpo da requisição.
     * @return \Illuminate\Http\Client\Response O objeto de resposta da API.
     */
    public function verify($token, $data)
    {
        //dd($data)
        //return Http::withToken($token)->post($this->baseUrl, $data);
        return Http::asForm()->post($this->baseUrl, $data);
        
    }
}
