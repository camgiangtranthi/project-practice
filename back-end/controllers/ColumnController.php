<?php

namespace app\controllers;

use app\core\Request;
use app\models\ColumnModel;

class ColumnController extends ApiController
{
    public function getColumns(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columns = $columnModel->findAll();

        return $this->respondWithData($columns);
    }

    public function getColumnById(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $columnModel = new ColumnModel();

        $id = $request->getRouteParams()['id'];
        $column = $columnModel->findOne(['id' => $id]);

        if ($column === false) {
            return $this->respondNotFound('Column not found');
        }

        return $this->respondWithData($column);
    }

    public function addColumn(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $columnModel = new ColumnModel();
        $columnModel->loadData($request->getBody());

        if (!$columnModel->validate()) {
            return $this->respondUnprocessableEntity($columnModel->errors);
        }

        $newColumn = $columnModel->save();

        if (!$newColumn) {
            return $this->respondUnprocessableEntity($columnModel->errors);
        }

        return $this->respondWithData(['column' => $newColumn]);
    }

    public function updateColumn(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $columnModel = new ColumnModel();

        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);

        if ($column === []) {
            return $this->respondNotFound('Column not found');
        }

        $columnModel->loadData($request->getBody());
        if (!$columnModel->validate()) {
            return $this->respondUnprocessableEntity($columnModel->errors);
        }

        return $this->respondWithData($columnModel->update($id));
    }

    public function deleteColumn(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $columnModel = new ColumnModel();

        $id = $request->getRouteParam('id');
        $column = $columnModel->findOne(['id' => $id]);

        if (!$column) {
            return $this->respondNotFound('Column not found');
        }

        $result = $columnModel->delete($id);
        if (!$result) {
            return $this->respondError('Column not deleted');
        }

        return $this->respondSuccess('Column deleted successfully');
    }
}
