<?php
declare(strict_types=1);

// Pokemon3d SDK utility: prepare_body

class Pokemon3dPrepareBody
{
    public static function call(Pokemon3dContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
