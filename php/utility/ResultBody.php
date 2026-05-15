<?php
declare(strict_types=1);

// Pokemon3d SDK utility: result_body

class Pokemon3dResultBody
{
    public static function call(Pokemon3dContext $ctx): ?Pokemon3dResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
