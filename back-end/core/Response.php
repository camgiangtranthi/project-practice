<?php

namespace app\core;

class Response
{
    public int $statusCode = 200;
    public array $data = [];

    public function setStatusCode(int $code)
    {
        http_response_code($code);
    }

    public function json(array $data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function setData(array $data)
    {
        $this->data = $data;
    }

    public function redirect(string $url)
    {
        header("Location: $url");
    }
}
