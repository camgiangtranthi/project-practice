<?php

namespace app\core;

use app\core\db\Database;

class Application
{
    public Router $router;
    public Request $request;
    public Response $response;
    public static Application $app;
    public Database $db;
    public static string $ROOT_DIR;

    public function __construct($rootDir, array $config)
    {
        self::$app = $this;
        self::$ROOT_DIR = $rootDir;
        $this->request = new Request();
        $this->response = new Response();
        $this->router = new Router($this->request, $this->response);
        $this->db = new Database($config['db']);
    }

    public function run()
    {
        $this->router->resolve();
    }
}
