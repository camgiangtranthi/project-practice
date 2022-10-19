<?php

namespace app\models;

use app\core\Abstraction;

class UserModel extends Abstraction
{
    public string $username = '';
    public string $password = '';
    public string $firstname = '';
    public string $lastname = '';
    public string $avatar = '';

    public function rules(): array
    {
        return [
            'username' => [self::RULE_REQUIRED, [self::RULE_UNIQUE, 'class' => self::class], self::LETTERS_AND_NUMBERS],
            'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8], self::LETTERS_AND_NUMBERS],
            'firstname' => [self::LETTERS_AND_SPACES],
            'lastname' => [self::LETTERS_AND_SPACES],
            'avatar' => []
        ];
    }

    public function tableName(): string
    {
        return 'users';
    }

    public function attributes(): array
    {
        return ['username', 'password', 'firstname', 'lastname', 'avatar'];
    }

    public function getDisplayName(): string
    {
        return $this->username;
    }

    public function save()
    {
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        return parent::save();
    }
}