<?php

namespace app\core\db;

class Database 
{
    public \PDO $pdo;

    public function __construct(array $config)
    {
        $dsn = $config['dsn'] ?? '';
        $user = $config['user'] ?? '';
        $password = $config['password'] ?? '';

        $this->pdo = new \PDO($dsn, $user, $password);
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    public function prepare($sql)
    {
        return $this->pdo->prepare($sql);
    }

    public function execute($sql, $params = [])
    {
        $statement = $this->prepare($sql);
        foreach ($params as $key => $value) {
            $statement->bindValue(":$key", $value);
        }
        $statement->execute();
        return $statement;
    }
}
