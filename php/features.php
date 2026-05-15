<?php
declare(strict_types=1);

// Pokemon3d SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Pokemon3dFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Pokemon3dBaseFeature();
            case "test":
                return new Pokemon3dTestFeature();
            default:
                return new Pokemon3dBaseFeature();
        }
    }
}
