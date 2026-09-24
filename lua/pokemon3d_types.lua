-- Typed models for the Pokemon3d SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Pokemon
---@field availableForms? table
---@field fileSize? number
---@field form? string
---@field forms? table
---@field generation? number
---@field id? number
---@field modelFormat? string
---@field modelUrl? string
---@field name? string
---@field textureUrl? string
---@field thumbnailUrl? string
---@field type? table

---@class PokemonLoadMatch
---@field id string
---@field form? string

---@class PokemonListMatch
---@field limit? number
---@field offset? number

local M = {}

return M
