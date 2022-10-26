<?php

namespace app\core\db;

use app\core\Application;
use app\core\Model;

abstract class DbModel extends Model
{
    abstract public function tableName(): string;
    abstract public function attributes(): array;

    public function save()
    {
        $tableName = $this->tableName();
        $attributes = $this->attributes();

        $params = array_map(fn($attr) => ":$attr", $attributes);

        $statement = self::prepare("INSERT INTO $tableName (" . implode(',', $attributes) . ") VALUES (" . implode(',', $params) . ")");

        foreach ($attributes as $attribute) {
            $statement->bindValue(":$attribute", $this->{$attribute});

        }

        $statement->execute();

        $newId = Application::$app->db->pdo->lastInsertId();
        return $this->findOne(['id' => $newId]);
    }

    public function findOne($where)
    {
        $tableName = static::tableName();
        $attributes = array_keys($where);

        $sql = implode("AND ", array_map(fn($attr) => "$attr = :$attr", $attributes));

        $statement = self::prepare("SELECT * FROM $tableName WHERE $sql");

        foreach ($where as $key => $item) {
            $statement->bindValue(":$key", $item);
        }

        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function findOneAllowPassword($where)
    {
        $tableName = static::tableName();
        $attributes = array_keys($where);

        $sql = implode("AND ", array_map(fn($attr) => "$attr = :$attr", $attributes));

        $statement = self::prepare("SELECT * FROM $tableName WHERE $sql");

        foreach ($where as $key => $item) {
            $statement->bindValue(":$key", $item);
        }

        $statement->execute();

        return $statement->fetchObject(static::class);
    }

    public function findAll()
    {
        $tableName = $this->tableName();

        $statement = self::prepare("SELECT * FROM $tableName");

        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function update($id)
    {
        $tableName = $this->tableName();
        $attributes = $this->attributes();

        $setValueString = '';

        foreach ($attributes as $attribute) {
            if (isset($this->{$attribute}) && $this->{$attribute} !== 0) {
                $setValueString .= "$attribute = :$attribute, ";
            }
        }

        $setValueString = substr($setValueString, 0, strlen($setValueString) - 2);

        $sql = "UPDATE $tableName SET $setValueString WHERE id = $id";

        $statement = self::prepare($sql);

        foreach ($attributes as $attribute) {
            if (isset($this->{$attribute}) && $this->{$attribute} !== 0) {
                $statement->bindParam(":$attribute", $this->{$attribute});
            }

        }

        $statement->execute();

        return $this->findOne(['id' => $id]);
    }


    public function delete($id)
    {
        $tableName = $this->tableName();

        $statement = self::prepare("DELETE FROM $tableName WHERE id = $id");

        $statement->execute();

        return true;
    }

    public static function prepare($sql)
    {
        return Application::$app->db->pdo->prepare($sql);
    }
}
