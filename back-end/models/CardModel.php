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
    public string $attachment = '';
    public bool $status = true;

    public function getDisplayName(): string
    {
        return $this->title;
    }

    public function rules(): array
    {
        return [
            'title' => [self::RULE_REQUIRED, [self::RULE_MAX, 'max' => 100], self::LETTERS_SPACES_AND_NUMBERS],
            'description' => [[self::RULE_MAX, 'max' => 1000]],
            'column_id' => [self::RULE_REQUIRED, self::RULE_INTEGER],
            'card_order' => [self::RULE_INTEGER],
        ];
    }

    public function tableName(): string
    {
        return 'cards';
    }

    public function attributes(): array
    {
        return ['id', 'title', 'description', 'column_id', 'card_order', 'start_date', 'due_date', 'attachment', 'status'];
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
