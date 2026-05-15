<?php
declare(strict_types=1);

// Pokemon3d SDK exists test

require_once __DIR__ . '/../pokemon3d_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Pokemon3dSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
