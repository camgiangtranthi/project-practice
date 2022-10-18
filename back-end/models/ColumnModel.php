<?php

namespace app\models;

use app\core\Column;
use app\core\Model;

class ColumnModel extends Column
{
    public int $id = 0;
    public string $user_id = '';
    public string $title = '';

    public function rules(): array
    {
        return [
            'user_id' => [self::RULE_REQUIRED],
            'title' => [self::RULE_REQUIRED],
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

    public function findByUserId($user_id)
    {
        $statement = $this->prepare("SELECT * FROM columns WHERE user_id = :user_id");
        $statement->bindValue(":user_id", $user_id);
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}
