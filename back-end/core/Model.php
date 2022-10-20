<?php

namespace app\core;

class Model
{
    public const RULE_REQUIRED = 'required';
    public const RULE_MIN = 'min';
    public const RULE_MAX = 'max';
    public const RULE_MATCH = 'match';
    public const RULE_UNIQUE = 'unique';
    public const RULE_INTEGER = 'integer';
    public const LETTERS_AND_SPACES = 'lettersAndSpaces';
    public const LETTERS_AND_NUMBERS = 'lettersAndNumbers';
    public const LETTERS_SPACES_AND_NUMBERS = 'lettersSpacesAndNumbers';
    public const RULE_PASSWORD = 'password';

    public array $errors = [];

    public function loadData($data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
    }

    public function loadDataExcept($data, $except)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key) && !in_array($key, $except)) {
                $this->{$key} = $value;
            }
        }
    }

    public function validate()
    {
        foreach ($this->rules() as $attribute => $rules) {
            $value = $this->{$attribute};
            foreach ($rules as $rule) {
                $ruleName = $rule;
                if (!is_string($ruleName)) {
                    $ruleName = $rule[0];
                }
                if ($ruleName === self::RULE_REQUIRED && !$value) {
                    $this->addError($attribute, self::RULE_REQUIRED);
                }
                if ($ruleName === self::RULE_MIN && strlen($value) < $rule['min']) {
                    $this->addError($attribute, self::RULE_MIN, $rule);
                }
                if ($ruleName === self::RULE_MAX && strlen($value) > $rule['max']) {
                    $this->addError($attribute, self::RULE_MAX, $rule);
                }
                if ($ruleName === self::RULE_MATCH && $value !== $this->{$rule['match']}) {
                    $this->addError($attribute, self::RULE_MATCH, $rule);
                }
                if ($ruleName === self::RULE_UNIQUE) {
                    $className = $rule['class'];
                    $uniqueAttr = $rule['attribute'] ?? $attribute;
                    $tableName = $className::tableName();
                    $statement = Application::$app->db->prepare("SELECT * FROM $tableName WHERE $uniqueAttr = :attr");
                    $statement->bindValue(":attr", $value);
                    $statement->execute();
                    $record = $statement->fetchObject();
                    if ($record) {
                        $this->addError($attribute, self::RULE_UNIQUE, ['field' => $attribute]);
                    }
                }
                if ($ruleName === self::RULE_INTEGER && !is_int($value)) {
                    $this->addError($attribute, self::RULE_INTEGER);
                }
                if ($ruleName === self::LETTERS_AND_SPACES && !preg_match('/^[a-zA-Z ]*$/', $value)) {
                    $this->addError($attribute, self::LETTERS_AND_SPACES);
                }
                if ($ruleName === self::LETTERS_AND_NUMBERS && !preg_match('/^[a-zA-Z0-9]+$/', $value)) {
                    $this->addError($attribute, self::LETTERS_AND_NUMBERS);
                }
                if ($ruleName === self::LETTERS_SPACES_AND_NUMBERS && !preg_match('/^[a-zA-Z0-9 ]+$/', $value)) {
                    $this->addError($attribute, self::LETTERS_SPACES_AND_NUMBERS);
                }
                if ($ruleName === self::RULE_PASSWORD && !preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/', $value)) {
                    $this->addError($attribute, self::RULE_PASSWORD);
                }
            }
        }

        return empty($this->errors);
    }

    public function addError($attribute, $rule, $params = [])
    {
        $message = $this->errorMessages()[$rule] ?? '';
        foreach ($params as $key => $value) {
            $message = str_replace("{{$key}}", $value, $message);
        }
        $this->errors[$attribute][] = $message;
    }

    public function errorMessages()
    {
        return [
            self::RULE_REQUIRED => 'This field is required',
            self::RULE_MIN => 'Min length of this field must be {min}',
            self::RULE_MAX => 'Max length of this field must be {max}',
            self::RULE_MATCH => 'This field must be the same as {match}',
            self::RULE_UNIQUE => 'This {field} already exists',
            self::RULE_INTEGER => 'This field must be an integer',
            self::LETTERS_AND_SPACES => 'This field must contain only letters and spaces',
            self::LETTERS_AND_NUMBERS => 'This field must contain only letters and numbers and no spaces',
            self::LETTERS_SPACES_AND_NUMBERS => 'This field must contain only letters, spaces and numbers',
            self::RULE_PASSWORD => 'Password must contain at least one number, one uppercase and one lowercase letter, and must be between 8 and 16 characters long'
        ];
    }

    public function rules(): array
    {
        return [];
    }
}
