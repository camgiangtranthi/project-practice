<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\UserModel;

class AuthController
{
    public function signIn(Request $request)
    {
        $response = new Response();
        $response->setStatusCode(200);
        $response->setData(['message' => 'Sign in successful']);
        return $response->json($response->data);
    }
}