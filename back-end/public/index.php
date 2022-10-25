<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/x-www-form-urlencoded, multipart/form-data, application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    return 204;
}

require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

use app\core\Application;
use app\controllers\ColumnController;
use app\controllers\AuthController;

$config = [
    'db' => [
        'dsn' => $_ENV['DB_DSN'],
        'user' => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASSWORD'],
    ]
];
$app = new Application(dirname(__DIR__), $config);

// Column routes
$app->router->get('/columns', [ColumnController::class, 'getColumns']);
$app->router->get('/columns/{id}', [ColumnController::class, 'getColumnById']);
$app->router->post('/columns', [new ColumnController(), 'addColumn']);
$app->router->post('/columns/{id}', [new ColumnController(), 'updateColumn']);
$app->router->delete('/columns/{id}', [new ColumnController(), 'deleteColumn']);

// Auth routes
$app->router->post('/sign-up', [new AuthController(), 'signUp']);
$app->router->post('/sign-in', [new AuthController(), 'signIn']);


$app->run();