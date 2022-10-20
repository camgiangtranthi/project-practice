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

    public function getColumnById(Request $request)
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);
        if ($column) {
            $response->setStatusCode(200);
            $response->setData($column);
            return $response->json($response->data);
        }

        $response->setStatusCode(404);
        $response->setData(['error' => 'Column not found']);
        return $response->json($response->data);
    }

    public function getColumnsByUserId(Request $request)
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $user_id = $request->getRouteParam('user_id');
        $columns = $columnModel->findOne(['user_id' => $user_id]);
        if ($columns) {
            $response->setStatusCode(200);
            $response->setData($columns);
            return $response->json($response->data);
        }

        $response->setStatusCode(404);
        $response->setData(['error' => 'Columns not found']);
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

    public function updateColumn(Request $request)
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);
        if ($column) {
            $columnModel->loadData($request->getBody());
            if ($columnModel->validate() && $columnModel->update($id)) {
                $response->setStatusCode(200);
                $response->setData(['message' => 'Column updated successfully']);
                return $response->json($response->data);
            }

            $response->setStatusCode(422);
            $response->setData($columnModel->errors);
            return $response->json($response->data);
        }

        $response->setStatusCode(404);
        $response->setData(['error' => 'Column not found']);
        return $response->json($response->data);
    }

    public function deleteColumn(Request $request)
    {
        $columnModel = new ColumnModel();
        $response = new Response();
        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);
        if ($column) {
            if ($columnModel->delete($id)) {
                $response->setStatusCode(200);
                $response->setData(['message' => 'Column deleted successfully']);
                return $response->json($response->data);
            }

            $response->setStatusCode(422);
            $response->setData(['error' => 'Column not deleted']);
            return $response->json($response->data);
        }

        $response->setStatusCode(404);
        $response->setData(['error' => 'Column not found']);
        return $response->json($response->data);
    }
}
