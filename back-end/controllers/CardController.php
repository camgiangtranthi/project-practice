<?php

namespace app\controllers;

use app\core\Request;
use app\core\Response;
use app\models\CardModel;

class CardController extends ApiController
{
    public function getCards(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $cardModel = new CardModel();
        $cards = $cardModel->findAll();

        return $this->respondWithData($response, $cards);
    }

    public function getCardById(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $cardModel = new CardModel();

        $id = $request->getRouteParams()['id'];
        $card = $cardModel->findOne(['id' => $id]);

        if ($card === false) {
            return $this->respondNotFound($response, 'Card not found');
        }

        return $this->respondWithData($response, $card);
    }

    public function getCardByColumnId(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $cardModel = new CardModel();

        $id = $request->getRouteParams()['id'];
        $card = $cardModel->findOne(['column_id' => $id]);

        if ($card === false) {
            return $this->respondNotFound($response, 'Card not found');
        }

        return $this->respondWithData($response, $card);
    }

    public function addCard(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $cardModel = new CardModel();
        $cardModel->loadData($request->getBody());

        if (!$cardModel->validate()) {
            return $this->respondUnprocessableEntity($response, $cardModel->errors);
        }

        $newCard = $cardModel->save();

        if (!$newCard) {
            return $this->respondUnprocessableEntity($response, 'Card not created');
        }

        unset($newCard->errors);
        return $this->respondWithData($response, ['card' => $newCard]);
    }

    public function updateCard(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $id = $request->getRouteParams()['id'];
        $cardModel = new CardModel();

        $card = $cardModel->findOne(['id' => $id]);
        if ($card === []) {
            return $this->respondNotFound($response, 'Card not found');
        }

        $cardModel->loadData($request->getBody());
        if (!$cardModel->validate()) {
            return $this->respondUnprocessableEntity($response, $cardModel->errors);
        }

        return $this->respondWithData($response, $cardModel->update($id));
    }

    public function deleteCard(Request $request)
    {
        $response = new Response();

        if (TokenController::authorize($request) === false) {
            return $this->respondUnauthorized($response, 'Unauthorized');
        }

        $id = $request->getRouteParams()['id'];
        $cardModel = new CardModel();

        $card = $cardModel->findOne(['id' => $id]);
        if ($card === []) {
            return $this->respondNotFound($response, 'Card not found');
        }

        if (!$cardModel->delete($id)) {
            return $this->respondUnprocessableEntity($response, 'Card could not be deleted');
        }

        return $this->respondSuccess($response, 'Card deleted successfully');
    }
}