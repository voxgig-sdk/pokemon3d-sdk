<?php
declare(strict_types=1);

// Typed models for the Pokemon3d SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Pokemon entity data model. */
class Pokemon
{
    public ?array $available_form = null;
    public ?int $file_size = null;
    public ?string $form = null;
    public ?int $generation = null;
    public ?int $id = null;
    public ?string $model_format = null;
    public ?string $model_url = null;
    public ?string $name = null;
    public ?string $texture_url = null;
    public ?string $thumbnail_url = null;
    public ?array $type = null;
}

/** Request payload for Pokemon#load. */
class PokemonLoadMatch
{
    public string $id;
}

/** Match filter for Pokemon#list (any subset of Pokemon fields). */
class PokemonListMatch
{
    public ?array $available_form = null;
    public ?int $file_size = null;
    public ?string $form = null;
    public ?int $generation = null;
    public ?int $id = null;
    public ?string $model_format = null;
    public ?string $model_url = null;
    public ?string $name = null;
    public ?string $texture_url = null;
    public ?string $thumbnail_url = null;
    public ?array $type = null;
}

