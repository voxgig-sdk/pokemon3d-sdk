-- Typed models for the Pokemon3d SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Pokemon
---@field available_form? table
---@field file_size? number
---@field form? string
---@field generation? number
---@field id? number
---@field model_format? string
---@field model_url? string
---@field name? string
---@field texture_url? string
---@field thumbnail_url? string
---@field type? table

---@class PokemonLoadMatch
---@field id string

---@class PokemonListMatch

local M = {}

return M
