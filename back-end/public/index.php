<?php

require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

use app\core\Application;
use app\controllers\ColumnController;
use app\controllers\UserController;

$config = [
    'db' => [
        'dsn' => $_ENV['DB_DSN'],
        'user' => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASSWORD'],
    ]
];

$app = new Application(dirname(__DIR__), $config);

$app->router->get('/', function() {
    return 'Hello World';
});

$app->router->get('/contact', function() {
    return 'Contact';
});

$app->router->post('/column', [new ColumnController(), 'index']);


$app->run();
