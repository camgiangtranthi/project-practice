<?php

namespace app\controllers;


require_once __DIR__ . '/../vendor/autoload.php';

use app\core\Request;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class TokenController
{
    public static function generateToken($payload)
    {
        $key = $_ENV['JWT_SECRET'];
        $token = JWT::encode($payload, $key, 'HS256');
        return $token;
    }

    public static function verifyToken($token)
    {
        $key = $_ENV['JWT_SECRET'];
        try {
            return JWT::decode($token, new Key($key, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }

    public static function authorize(Request $request)
    {
        $decoded = self::verifyToken($request->getHeader('Authorization'));
        return $decoded !== false ? $decoded : false;
    }
}
