<?php

namespace app\controllers;

use app\core\Request;
use app\models\UserModel;

class AuthController extends ApiController
{
    public function signUp(Request $request)
    {
        $userModel = new UserModel();

        $data = $request->getBody();
        $userModel->loadData($data);

        if ($userModel->findOne(['username' => $data['username']])) {
            return $this->respondError('User already exists');
        }

        if ($data['password'] !== $data['confirm_password']) {
            return $this->respondError('Passwords do not match');
        }

        if (!$userModel->validate()) {
            return $this->respondUnprocessableEntity($userModel->errors);
        }

        if (!$userModel->save()) {
            return $this->respondError('User could not be created');
        }

        return $this->respondSuccess('User created successfully');
    }

    public function signIn(Request $request)
    {
        $userModel = new UserModel();

        $data = $request->getBody();
        $user = $userModel->findOneAllowPassword(['username' => $data['username']]);

        if (!$user) {
            return $this->respondError('User not found');
        }

        if (!password_verify($data['password'], $user->password)) {
            return $this->respondError('Password is incorrect');
        }

        $payload = [
            'id' => $user->id,
            'username' => $user->username,
            'exp' => time() + 60 * 60
        ];

        $token = TokenController::generateToken($payload);
        unset($user->password, $user->errors);
        return $this->respondWithData(['user' => $user, 'token' => $token]);
    }
}
