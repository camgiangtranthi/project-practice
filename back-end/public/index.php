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
use app\controllers\CardController;

$config = [
    'db' => [
        'dsn' => $_ENV['DB_DSN'],
        'user' => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASSWORD'],
    ]
];
$app = new Application(dirname(__DIR__), $config);

// Column routes
$app->router->get('/columns/{id}', [new ColumnController(), 'getColumnById']);
$app->router->get('/columns', [new ColumnController(), 'getColumns']);
$app->router->post('/columns/{id}', [new ColumnController(), 'updateColumn']);
$app->router->post('/columns', [new ColumnController(), 'addColumn']);
$app->router->delete('/columns/{id}', [new ColumnController(), 'deleteColumn']);

// Card routes
$app->router->get('/cards/column/{id}', [new CardController(), 'getCardByColumnId']);
$app->router->get('/cards/{id}', [new CardController(), 'getCardById']);
$app->router->get('/cards', [new CardController(), 'getCards']);
$app->router->post('/cards', [new CardController(), 'addCard']);

// Auth routes
$app->router->post('/sign-up', [new AuthController(), 'signUp']);
$app->router->post('/sign-in', [new AuthController(), 'signIn']);


$app->run();
