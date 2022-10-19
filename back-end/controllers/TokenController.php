<?php

namespace app\controllers;


require_once __DIR__ . '/../vendor/autoload.php';
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

}