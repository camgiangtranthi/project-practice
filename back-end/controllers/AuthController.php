<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\UserModel;

class AuthController extends ApiController
{
    public function signUp(Request $request)
    {
        $response = new Response();

        $userModel = new UserModel();

        $data = $request->getBody();
        $userModel->loadData($data);

        if ($userModel->findOne(['username' => $data['username']])) {
            return $this->respondError($response, 'User already exists');
        }

        if ($data['password'] !== $data['confirm_password']) {
            return $this->respondError($response, 'Passwords do not match');
        }

        if (!$userModel->validate()) {
            return $this->respondUnprocessableEntity($response, $userModel->errors);
        }

        if (!$userModel->save()) {
            return $this->respondError($response, 'User could not be created');
        }

        return $this->respondSuccess($response, 'User created successfully');
    }

    public function signIn(Request $request)
    {
        $response = new Response();

        $userModel = new UserModel();

        $data = $request->getBody();
        $user = $userModel->findOneAllowPassword(['username' => $data['username']]);

        if (!$user) {
            return $this->respondError($response, 'User not found');
        }

        if (!password_verify($data['password'], $user->password)) {
            return $this->respondError($response, 'Password is incorrect');
        }

        $payload = [
            'id' => $user->id,
            'username' => $user->username,
            'exp' => time() + 60 * 60
        ];

        $token = TokenController::generateToken($payload);
        unset($user->password, $user->errors);
        return $this->respondWithData($response, ['user' => $user, 'token' => $token]);
    }
}
