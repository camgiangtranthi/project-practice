<?php

namespace app\models;

use app\core\Abstraction;

class ColumnModel extends Abstraction
{
    public int $id = 0;
    public string $user_id = '';
    public string $title = '';

    public function rules(): array
    {
        return [
            'user_id' => [self::RULE_REQUIRED],
            'title' => [self::RULE_REQUIRED, [self::RULE_MAX, 'max' => 100], self::LETTERS_SPACES_AND_NUMBERS],
        ];
    }

    public function tableName(): string
    {
        return 'columns';
    }

    public function attributes(): array
    {
        return ['id', 'user_id', 'title'];
    }

    public function getDisplayName(): string
    {
        return $this->title;
    }

    public function update($id)
    {
        //keep id the same
        $this->id = $id;
        return parent::update($id);
    }
}
