<?php

namespace app\models;

use app\core\Abstraction;

class ColumnModel extends Abstraction
{
    public int $id = 0;
    public string $title = '';
    public int $column_order = 0;

    public function rules(): array
    {
        return [
            'title' => [[self::RULE_MAX, 'max' => 100]],
            'column_order' => [self::RULE_INTEGER]
        ];
    }

    public function tableName(): string
    {
        return 'columns';
    }

    public function attributes(): array
    {
        return ['id', 'title', 'column_order'];
    }

    public function getDisplayName(): string
    {
        return $this->title;
    }

    // Create order before saving
    public function save()
    {
        $this->column_order = $this->getMaxOrder() + 1;
        return parent::save();
    }

    public function getMaxOrder()
    {
        $statement = $this->prepare("SELECT MAX(`column_order`) FROM {$this->tableName()}");
        $statement->execute();
        return $statement->fetchColumn();
    }
}
