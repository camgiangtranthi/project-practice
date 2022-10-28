<?php

namespace app\controllers;

use app\core\Request;
use app\models\CardModel;
use app\models\ColumnModel;

class CardController extends ApiController
{
    public function getCards(Request $request)
    {if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $cardModel = new CardModel();
        $cards = $cardModel->findAll();

        return $this->respondWithData($cards);
    }

    public function getCardById(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $cardModel = new CardModel();

        $id = $request->getRouteParams()['id'];
        $card = $cardModel->findOne(['id' => $id]);

        if ($card === false) {
            return $this->respondNotFound('Card not found');
        }

        return $this->respondWithData($card);
    }

    public function getCardByColumnId(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $cardModel = new CardModel();

        $id = $request->getRouteParams()['id'];
        $card = $cardModel->findOne(['column_id' => $id]);

        if ($card === false) {
            return $this->respondNotFound('Card not found');
        }

        return $this->respondWithData($card);
    }


    public function addCard(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $cardModel = new CardModel();
        $data = $request->getBody();
        $cardModel->loadData($data);

        $column_id = $data['column_id'];
        $columnModel = new ColumnModel();
        $column = $columnModel->findOne(['id' => $column_id]);

        if ($column === []) {
            return $this->respondNotFound('Column not found');
        }

        if (!$cardModel->validate()) {
            return $this->respondUnprocessableEntity($cardModel->errors);
        }

        $newCard = $cardModel->save();

        if (!$newCard) {
            return $this->respondUnprocessableEntity('Card not created');
        }

        return $this->respondWithData(['card' => $newCard]);
    }

    public function addCardByColumnId(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $cardModel = new CardModel();
        $columnModel = new ColumnModel();

        $data = $request->getBody();
        $column_id = $request->getRouteParams()['id'];
        $data['column_id'] = $column_id;

        $cardModel->loadData($data);

        $column = $columnModel->findOne(['id' => $column_id]);

        if ($column === []) {
            return $this->respondNotFound('Column not found');
        }

        if (!$cardModel->validate()) {
            return $this->respondUnprocessableEntity($cardModel->errors);
        }

        $newCard = $cardModel->save();

        if (!$newCard) {
            return $this->respondUnprocessableEntity('Card not created');
        }

        return $this->respondWithData(['card' => $newCard]);
    }

    public function updateCard(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $id = $request->getRouteParams()['id'];
        $cardModel = new CardModel();

        $card = $cardModel->findOne(['id' => $id]);
        if ($card === []) {
            return $this->respondNotFound('Card not found');
        }

        $cardModel->loadData($request->getBody());
        if (!$cardModel->validate()) {
            return $this->respondUnprocessableEntity($cardModel->errors);
        }

        return $this->respondWithData($cardModel->update($id));
    }

    public function deleteCard(Request $request)
    {
        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized('Unauthorized');
        }

        $id = $request->getRouteParams()['id'];
        $cardModel = new CardModel();

        $card = $cardModel->findOne(['id' => $id]);
        if ($card === []) {
            return $this->respondNotFound('Card not found');
        }

        if (!$cardModel->delete($id)) {
            return $this->respondUnprocessableEntity('Card could not be deleted');
        }

        return $this->respondSuccess('Card deleted successfully');
    }
}