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
            'title' => [self::RULE_REQUIRED, [self::RULE_MAX, 'max' => 100], self::LETTERS_SPACES_AND_NUMBERS],
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

    public function update($id)
    {
        $this->id = $id;
        return parent::update($id);
    }

    // Front end return array of columns include id and their new order.
    // Example: $columnsWithOrder = ['id', 'column_order'];
    // [
    // ['id' => '1', 'column_order' => '1'],
    // ['id' => '2', 'column_order' => '2'],
    // ['id' => '3', 'column_order' => '3']
    // ]

    public function updateOrder($columnsWithOrder)
    {
        foreach ($columnsWithOrder as $column) {
            $statement = $this->prepare("UPDATE {$this->tableName()} SET `column_order` = ? WHERE `id` = ?;");
            $statement->bindValue(1, $column['column_order']);
            $statement->bindValue(2, $column['id']);
            if (!$statement->execute()) {
                return false;
            }
        }
        return true;
    }
}
