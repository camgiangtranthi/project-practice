<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\ColumnModel;

class ColumnController extends ApiController
{
    public function getColumns(Request $request)
    {
        $response = new Response();

        $decoded = TokenController::verifyToken($request->getHeader('Authorization'));
        if ($decoded === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columns = $columnModel->findAll();

        return $this->respondWithData($response, $columns);
    }

    public function getColumnById(Request $request)
    {
        $response = new Response();

        $decoded = TokenController::verifyToken($request->getHeader('Authorization'));
        if ($decoded === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }
        $columnModel = new ColumnModel();
        $body = $request->getBody();
        $column = $columnModel->findOne(['id' => $body['id']]);
        if ($column === false) {
            return $this->respondNotFound($response, 'Column not found');
        }
        return $this->respondWithData($response, $column);
    }

    public function addColumn(Request $request)
    {
        $response = new Response();

        $decoded = TokenController::verifyToken($request->getHeader('Authorization'));
        if ($decoded === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columnModel->loadData($request->getBody());

        if ($columnModel->validate() && $columnModel->save()) {
            return $this->respondSuccess($response, 'Column created successfully');
        }
        return $this->respondUnprocessableEntity($response, $columnModel->errors);
    }

    public function updateColumn(Request $request)
    {
        $response = new Response();

        $columnModel = new ColumnModel();

        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);

        if (!$column) {
            return $this->respondNotFound($response, 'Column not found');
        }

        $columnModel->loadData($request->getBody());
        if (!$columnModel->validate()) {
            return $this->respondUnprocessableEntity($response, $columnModel->errors);
        }

        $result = $columnModel->update($id);
        if (!$result) {
            return $this->respondError($response, 'Column not updated');
        }

        return $this->respondSuccess($response, 'Column updated successfully');
    }

    public function deleteColumn(Request $request)
    {
        $response = new Response();

        $columnModel = new ColumnModel();

        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);

        if (!$column) {
            return $this->respondNotFound($response, 'Column not found');
        }

        $result = $columnModel->delete($id);
        if (!$result) {
            return $this->respondError($response, 'Column not deleted');
        }

        return $this->respondSuccess($response, 'Column deleted successfully');
    }
}
