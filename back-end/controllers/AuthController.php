<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\UserModel;

class AuthController extends ApiController
{
    public function signUp(Request $request)
    {
        $userModel = new UserModel();
        $response = new Response();
        $data = $request->getBody();
        $userModel->loadData($data);
        if ($userModel->findOne(['username' => $data['username']])) {
            return $this->respondError($response, 'User already exists');
        }
        if ($data['password'] !== $data['confirm_password']) {
            return $this->respondError($response, 'Passwords do not match');
        }
        if ($userModel->validate() && $userModel->save()) {
            return $this->respondCreated($response, 'User created successfully');
        }
        return $this->respondUnprocessableEntity($response, $userModel->errors);
    }
}
