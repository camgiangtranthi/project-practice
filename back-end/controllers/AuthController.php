<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\UserModel;

class AuthController
{
    public function signUp(Request $request)
    {
        $userModel = new UserModel();
        $response = new Response();
        $data = $request->getBody();
        $userModel->loadData($data);
        //check password and confirm password
        if ($data['password'] !== $data['confirm_password']) {
            $response->setStatusCode(400);
            $response->setData(['error' => 'Password and confirm password do not match']);
            return $response->json($response->data);
        }

        if ($userModel->validate() && $userModel->save()) {
            $response->setStatusCode(201);
            $response->setData(['success' => 'User created']);
            return $response->json($response->data);
        }

        $response->setStatusCode(422);
        $response->setData($userModel->errors);
        return $response->json($response->data);
    }


}
