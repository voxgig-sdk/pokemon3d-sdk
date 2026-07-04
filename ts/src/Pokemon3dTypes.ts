// Typed models for the Pokemon3d SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Pokemon {
  available_form?: any[]
  file_size?: number
  form?: string
  generation?: number
  id?: number
  model_format?: string
  model_url?: string
  name?: string
  texture_url?: string
  thumbnail_url?: string
  type?: any[]
}

export interface PokemonLoadMatch {
  id: string
}

export type PokemonListMatch = Partial<Pokemon>

