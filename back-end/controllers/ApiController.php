<?php

namespace app\controllers;

use app\core\Response;

class ApiController
{
    public function respondWithData(Response $response, $data)
    {
        $response->setStatusCode(200);
        $response->setData($data);
        return $response->json($response->data);
    }

    public function respondError(Response $response, $error)
    {
        $response->setStatusCode(400);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondSuccess(Response $response, $success)
    {
        $response->setStatusCode(200);
        $response->setData(['success' => $success]);
        return $response->json($response->data);
    }

    public function respondNotFound(Response $response, $error)
    {
        $response->setStatusCode(404);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondCreated(Response $response, $success)
    {
        $response->setStatusCode(201);
        $response->setData(['success' => $success]);
        return $response->json($response->data);
    }

    public function respondUnauthorized(Response $response, $error)
    {
        $response->setStatusCode(401);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondForbidden(Response $response, $error)
    {
        $response->setStatusCode(403);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }

    public function respondUnprocessableEntity(Response $response, $error)
    {
        $response->setStatusCode(422);
        $response->setData(['error' => $error]);
        return $response->json($response->data);
    }
}