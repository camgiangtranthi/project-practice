<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\ColumnModel;

class ColumnController
{
    public function getColumns()
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $columns = $columnModel->findAll();
        $response->setStatusCode(200);
        $response->setData($columns);
        return $response->json($response->data);
    }

    public function addColumn(Request $request)
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $columnModel->loadData($request->getBody());
        if ($columnModel->validate() && $columnModel->save()) {
            $response->setStatusCode(201);
            $response->setData(['message' => 'Column added successfully']);
            return $response->json($response->data);
        }
        $response->setStatusCode(422);
        $response->setData($columnModel->errors);
        return $response->json($response->data);
    }
}
