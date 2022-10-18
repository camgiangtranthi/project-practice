<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;

class AuthController
{
    public function login(Request $request, Response $response)
    {
        $body = $request->getBody();
        $response->json($body);
    }

    public function register()
    {
        echo 'register';
    }
}