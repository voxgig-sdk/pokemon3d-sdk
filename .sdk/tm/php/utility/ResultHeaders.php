<?php
declare(strict_types=1);

// Pokemon3d SDK utility: result_headers

class Pokemon3dResultHeaders
{
    public static function call(Pokemon3dContext $ctx): ?Pokemon3dResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
