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

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columns = $columnModel->findAll();

        return $this->respondWithData($response, $columns);
    }

    public function getColumnById(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();

        $id = $request->getRouteParams()['id'];
        $column = $columnModel->findOne(['id' => $id]);

        if ($column === false) {
            return $this->respondNotFound($response, 'Column not found');
        }

        return $this->respondWithData($response, $column);
    }

    public function addColumn(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columnModel->loadData($request->getBody());

        if (!$columnModel->validate()) {
            return $this->respondUnprocessableEntity($response, $columnModel->errors);
        }

        $newColumn = $columnModel->save();

        if (!$newColumn) {
            return $this->respondUnprocessableEntity($response, $columnModel->errors);
        }

        return $this->respondWithData($response, ['column' => $newColumn]);
    }

    public function updateColumn(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $columnModel = new ColumnModel();

        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);

        if ($column === []) {
            return $this->respondNotFound($response, 'Column not found');
        }

        $columnModel->loadData($request->getBody());
        if (!$columnModel->validate()) {
            return $this->respondUnprocessableEntity($response, $columnModel->errors);
        }

        return $this->respondWithData($response, $columnModel->update($id));
    }

    public function deleteColumn(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

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
