<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\UserModel;

class AuthController
{
    public function test(Request $request)
    {
        //test jwt
        $token = $request->getHeader('Authorization');
        $decoded = TokenController::verifyToken($token);
        $response = new Response();
//        if ($decoded === false) {
//            $response->setStatusCode(401);
//            $response->setData(['error' => 'Unauthorized']);
//            return $response->json($response->data);
//        }
//        $response->setStatusCode(200);
//        $response->setData(['message' => 'Authorized']);
//        return $response->json($response->data);
        return $response->json($token);
    }
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

    public function signIn(Request $request)
    {
        $userModel = new UserModel();
        $response = new Response();
        $data = $request->getBody();
        $user = $userModel->findOneAllowPassword(['username' => $data['username']]);
        if (!$user) {
            $response->setStatusCode(404);
            $response->setData(['error' => 'User not found']);
            return $response->json($response->data);
        }

        if (!password_verify($data['password'], $user->password)) {
            $response->setStatusCode(401);
            $response->setData(['error' => 'Password is incorrect']);
            return $response->json($response->data);
        }

        $payload = [
            'id' => $user->id,
            'username' => $user->username,
            'iat' => time(),
            'exp' => time() + 60 * 60 * 24 * 7
        ];

        $token = TokenController::generateToken($payload);
        $response->setStatusCode(200);
        $response->setData(['user' => $user, 'token' => $token]);
        return $response->json($response->data);
    }
}
