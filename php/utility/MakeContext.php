<?php
declare(strict_types=1);

// Pokemon3d SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Pokemon3dMakeContext
{
    public static function call(array $ctxmap, ?Pokemon3dContext $basectx): Pokemon3dContext
    {
        return new Pokemon3dContext($ctxmap, $basectx);
    }
}
