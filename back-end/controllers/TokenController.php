<?php

namespace app\controllers;


require_once __DIR__ . '/../vendor/autoload.php';
use \Firebase\JWT\JWT;
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
            $decoded = JWT::decode($token, $key);
            return $decoded;
        } catch (\Exception $e) {
            return false;
        }
    }

}