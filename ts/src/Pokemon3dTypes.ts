// Typed models for the Pokemon3d SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Pokemon {
  availableForms?: any[]
  fileSize?: number
  form?: string
  forms?: any[]
  generation?: number
  id?: number
  modelFormat?: string
  modelUrl?: string
  name?: string
  textureUrl?: string
  thumbnailUrl?: string
  type?: any[]
}

export interface PokemonLoadMatch {
  id: string
  form?: string
}

export interface PokemonListMatch {
  limit?: number
  offset?: number
}

