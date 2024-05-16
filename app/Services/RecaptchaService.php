<?php

namespace App\Services;

use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\CurlPost;

class RecaptchaService
{
    private $recaptcha;

    public function __construct()
    {
        $this->recaptcha = new ReCaptcha(
            env('RECAPTCHA_SITE_KEY'),
            env('RECAPTCHA_SECRET_KEY'),
            new CurlPost()
        );
    }

    public function getScore($action, $ip): float
    {
        $response = $this->recaptcha->verify($action, $ip);
        return $response->getScore();
    }
}
