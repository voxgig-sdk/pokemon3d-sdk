# Typed models for the Pokemon3d SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Pokemon:
    available_form: Optional[list] = None
    file_size: Optional[int] = None
    form: Optional[str] = None
    generation: Optional[int] = None
    id: Optional[int] = None
    model_format: Optional[str] = None
    model_url: Optional[str] = None
    name: Optional[str] = None
    texture_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    type: Optional[list] = None


@dataclass
class PokemonLoadMatch:
    id: str


@dataclass
class PokemonListMatch:
    available_form: Optional[list] = None
    file_size: Optional[int] = None
    form: Optional[str] = None
    generation: Optional[int] = None
    id: Optional[int] = None
    model_format: Optional[str] = None
    model_url: Optional[str] = None
    name: Optional[str] = None
    texture_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    type: Optional[list] = None

