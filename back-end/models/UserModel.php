<?php

namespace app\models;

use app\core\Model;

class UserModel extends Model
{
    public string $username = '';
    public string $password = '';
    public string $firstname = '';
    public string $lastname = '';
    public string $avatar = '';

    public function rules(): array
    {
        return [
            'username' => [self::RULE_REQUIRED, [self::RULE_UNIQUE, 'class' => self::class]],
            'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8]],
            'firstname' => [],
            'lastname' => [],
            'avatar' => [],
            'created_at' => [self::RULE_REQUIRED],
        ];
    }

    public function tableName(): string
    {
        return 'users';
    }

    public function attributes(): array
    {
        return ['username', 'password', 'firstname', 'lastname', 'avatar', 'created_at'];
    }

    public function findAll()
    {
        $statement = $this->prepare("SELECT * FROM users");
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}
