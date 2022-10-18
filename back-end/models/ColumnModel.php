<?php

namespace app\models;

class ColumnModel
{
    public string $id = '';
    public string $userId = '';
    public string $title = '';

    //constructor
    public function __construct($id, $userId, $title)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
    }

    public function rules(): array
    {
        return [
            'id' => [self::RULE_REQUIRED],
            'userId' => [self::RULE_REQUIRED],
            'title' => [self::RULE_REQUIRED],
        ];
    }

    public function tableName(): string
    {
        return 'columns';
    }
}