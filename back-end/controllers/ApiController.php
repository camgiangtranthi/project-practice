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
    CONST ERROR_STATUS_CODE = 400;
    CONST FORBIDDEN_STATUS_CODE = 403;

    public function respondWithData(Response $response, $data)
    {
        $response->setStatusCode(self::SUCCESS_STATUS_CODE);
        $response->setData($data);
        return $response->json($response->data);
    }

    public function respondError(Response $response, $error)
    {
        $response->setStatusCode(self::ERROR_STATUS_CODE);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondSuccess(Response $response, $success)
    {
        $response->setStatusCode(self::SUCCESS_STATUS_CODE);
        $response->setData(['message' => $success]);
        return $response->json($response->data);
    }

    public function respondNotFound(Response $response, $error)
    {
        $response->setStatusCode(self::NOT_FOUND_STATUS_CODE);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondCreated(Response $response, $success)
    {
        $response->setStatusCode(self::CREATED_STATUS_CODE);
        $response->setData(['message' => $success]);
        return $response->json($response->data);
    }

    public function respondUnauthorized(Response $response, $error)
    {
        $response->setStatusCode(self::UNAUTHORIZED_STATUS_CODE);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondForbidden(Response $response, $error)
    {
        $response->setStatusCode(self::FORBIDDEN_STATUS_CODE);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondUnprocessableEntity(Response $response, $error)
    {
        $response->setStatusCode(self::UNPROCESSABLE_ENTITY_STATUS_CODE);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }
}