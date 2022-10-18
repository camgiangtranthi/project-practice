<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;

class ColumnController
{
    public function index(Request $request)
    {
        $body = $request->getBody();
        $response = new Response();
        $response->json($body);
    }
}
