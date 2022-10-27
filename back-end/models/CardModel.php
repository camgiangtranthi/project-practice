<?php

namespace app\models;

use app\core\Abstraction;

class CardModel extends Abstraction
{
    public int $id = 0;
    public string $title = '';
    public string $description = '';
    public int $column_id = 1;
    public int $card_order = 0;
    public string $start_date = '';
    public string $due_date = '';
    public bool $status = true;

    public function getDisplayName(): string
    {
        return $this->title;
    }

    public function rules(): array
    {
        return [
        ];
    }

    public function tableName(): string
    {
        return 'cards';
    }

    public function attributes(): array
    {
        return ['id', 'title', 'description', 'column_id', 'card_order', 'start_date', 'due_date', 'status'];
    }

    // Create order before saving
    public function save()
    {
        $this->card_order = $this->getMaxOrder() + 1;
        return parent::save();
    }

    public function getMaxOrder()
    {
        $statement = $this->prepare("SELECT MAX(`card_order`) FROM {$this->tableName()} WHERE `column_id` = :column_id");
        $statement->bindValue(':column_id', $this->column_id);
        $statement->execute();
        return $statement->fetchColumn();
    }
}
