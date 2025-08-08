<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Http; // metodos prontos


// criar uma simulacao pra zombar ou enganar a classe testada simulando o processo real
use Mockery;
use Mockery\MockInterface;
use App\Services\RecaptchaService;


class RecaptchaServiceTest extends TestCase
{
    //teste para funcionalidade de obter o segredo do recaptcha
    public function testGetSecretKey()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a chave secreta esperada
        $expectedSecretKey = config('services.google_recaptcha.secret_key');

        // Verifique se a chave secreta retornada corresponde à esperada usando o assertEquals retorna verdadeiro se for igual
        $this->assertEquals($expectedSecretKey, $recaptchaService->getSecretKey());
    }

    //teste para obter a chave do site do recaptcha
    public function testGetSitetKey()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a chave do site esperada
        $expectedSiteKey = env('SITE_KEY_RECAPTCHA');

        // Verifique se a chave secreta retornada corresponde à esperada usando o assertEquals retorna verdadeiro se for igual
        $this->assertEquals($expectedSiteKey, $recaptchaService->getSiteKey());
    }

    // teste para recupera a url da api do recaptcha
    public function testGetBaseUrl()
    {
        $recaptchaService = new RecaptchaService();

        // Defina a url esperada
        $expectedUrl = 'https://www.google.com/recaptcha/api/siteverify';

        // Verifique se a url retornada corresponde à esperada usando o assertEquals retorna verdadeiro se for igual
        $this->assertEquals($expectedUrl, $recaptchaService->getBaseUrl());
    }

    public function testVerify()
    {
        // Finge a resposta da API reCAPTCHA
        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'submit',
                'challenge_ts' => '2024-05-27T12:00:00Z',
                'hostname' => 'teste.clubesiga.com'
            ], 200)
        ]);

        $recaptchaService = new RecaptchaService();

        // Defina o token e os dados de teste vem do post no form teste
        $token = '03AFcWeA58d3i07YPEbpfphsETanydY6okp86lwVoOvfY_ZsE4cD2SA--CCR5FGwFzDVl8KJLNyB-5SPTP7a_PFYF9jHS1Ywl3dnT_iD25_JOV5ciXJtp3bb9vL2VDzbpIl-3nOtepzTp6tOV21LQLi8C6nKLuqlDVNiL4aE5kRnLIp_V_bpdY0TV81-4-bugoIngpTAYnm3HFvnNHiTLD2F06iCo24VbQXkXfb6y60Y3vjbRVHeTqmz09j6KzZGaKvyn8c2ZEUgMoHRGtggcH-6lIwuP75vM0jIFfVs7J7P0PfUgEFyJ-z0P6V3JOHKVq-gCl9CbRdUeJJ3c0m9pZLedTi6zxerWHqRho20_La33hCZbVKunLRCj3DMWRhZI0IGjDR2OHZId0EDpTjB3srz6o7iqSHspJ0KJBiXwSuekizBrrILU3OqKlIAVrQIQPmc6So4b2I-1T_2YeE3VYHN_6cf8i5wcSkgvgCoanvtMEjmnyLuCdRwUk7WvxKb1_dMsJc3I-XpyVjF4UwqeD3DS4qTALMrWMrAmKu_BblzXWN401lrQenof0bsG5ynuhyodVNwL85YWDiUhQZ4qxre61AhItXf4W55mYrSNV2d0xYpRWQxenxRDaeVy-AHJw_bvY0T_MCycxhE60WZlhHAMhHX_Bl3H59AGd6UB833AeJOAH6mfd3Oc';
        
        
        $data = [
            'secret' => $recaptchaService->getSecretKey(),
            'response' => $token,
            'remoteip' => '127.0.0.1'
        ];

        // Chame o método verify
        $response = $recaptchaService->verify($data);

        // Verifique se a resposta tem sucesso
        $this->assertTrue($response->json('success'));
        $this->assertEquals(0.9, $response->json('score'));
        $this->assertEquals('submit', $response->json('action'));
        $this->assertEquals('2024-05-27T12:00:00Z', $response->json('challenge_ts'));
        $this->assertEquals('teste.clubesiga.com', $response->json('hostname'));
    }

}
