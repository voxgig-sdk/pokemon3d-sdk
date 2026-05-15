<?php
declare(strict_types=1);

// Pokemon3d SDK utility: feature_add

class Pokemon3dFeatureAdd
{
    public static function call(Pokemon3dContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
