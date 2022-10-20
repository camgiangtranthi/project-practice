<?php

namespace app\core;

use app\core\db\DbModel;

abstract class Abstraction extends DbModel
{
    abstract public function getDisplayName(): string;
}
