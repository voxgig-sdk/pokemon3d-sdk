<?php
declare(strict_types=1);

// Pokemon3d SDK base feature

class Pokemon3dBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Pokemon3dContext $ctx, array $options): void {}
    public function PostConstruct(Pokemon3dContext $ctx): void {}
    public function PostConstructEntity(Pokemon3dContext $ctx): void {}
    public function SetData(Pokemon3dContext $ctx): void {}
    public function GetData(Pokemon3dContext $ctx): void {}
    public function GetMatch(Pokemon3dContext $ctx): void {}
    public function SetMatch(Pokemon3dContext $ctx): void {}
    public function PrePoint(Pokemon3dContext $ctx): void {}
    public function PreSpec(Pokemon3dContext $ctx): void {}
    public function PreRequest(Pokemon3dContext $ctx): void {}
    public function PreResponse(Pokemon3dContext $ctx): void {}
    public function PreResult(Pokemon3dContext $ctx): void {}
    public function PreDone(Pokemon3dContext $ctx): void {}
    public function PreUnexpected(Pokemon3dContext $ctx): void {}
}
