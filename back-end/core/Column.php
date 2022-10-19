<?php

namespace app\core;

use app\core\db\DbModel;

abstract class Column extends DbModel
{
    abstract public function getDisplayName(): string;
}
