<?php

namespace app\controllers;

use app\core\Response;

class ApiController
{
    const SUCCESS_STATUS_CODE = 200;
    const UNPROCESSABLE_ENTITY_STATUS_CODE = 422;
    const CREATED_STATUS_CODE = 201;
    const NOT_FOUND_STATUS_CODE = 404;
    const UNAUTHORIZED_STATUS_CODE = 401;
    const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
    const ERROR_STATUS_CODE = 400;
    const FORBIDDEN_STATUS_CODE = 403;

    public Response $response;

    public function respondWithData($data)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::SUCCESS_STATUS_CODE);
        $this->response->setData($data);
        return $this->response->json($this->response->data);
    }

    public function respondError($error)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::ERROR_STATUS_CODE);
        $this->response->setData(['error' => $error]);
        return $this->response->json($this->response->data);
    }

    public function respondSuccess($success)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::SUCCESS_STATUS_CODE);
        $this->response->setData(['message' => $success]);
        return $this->response->json($this->response->data);
    }

    public function respondNotFound($error)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::NOT_FOUND_STATUS_CODE);
        $this->response->setData(['error' => $error]);
        return $this->response->json($this->response->data);
    }

    public function respondCreated($success)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::CREATED_STATUS_CODE);
        $this->response->setData(['message' => $success]);
        return $this->response->json($this->response->data);
    }

    public function respondUnauthorized($error)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::UNAUTHORIZED_STATUS_CODE);
        $this->response->setData(['error' => $error]);
        return $this->response->json($this->response->data);
    }

    public function respondForbidden($error)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::FORBIDDEN_STATUS_CODE);
        $this->response->setData(['error' => $error]);
        return $this->response->json($this->response->data);
    }

    public function respondUnprocessableEntity($error)
    {
        $this->response = new Response();
        $this->response->setStatusCode(self::UNPROCESSABLE_ENTITY_STATUS_CODE);
        $this->response->setData(['error' => $error]);
        return $this->response->json($this->response->data);
    }
}
