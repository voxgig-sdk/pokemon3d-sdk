# frozen_string_literal: true

# Typed models for the Pokemon3d SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Pokemon entity data model.
#
# @!attribute [rw] availableForms
#   @return [Array, nil]
#
# @!attribute [rw] fileSize
#   @return [Integer, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] forms
#   @return [Array, nil]
#
# @!attribute [rw] generation
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] modelFormat
#   @return [String, nil]
#
# @!attribute [rw] modelUrl
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] textureUrl
#   @return [String, nil]
#
# @!attribute [rw] thumbnailUrl
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
Pokemon = Struct.new(
  :availableForms,
  :fileSize,
  :form,
  :forms,
  :generation,
  :id,
  :modelFormat,
  :modelUrl,
  :name,
  :textureUrl,
  :thumbnailUrl,
  :type,
  keyword_init: true
)

# Request payload for Pokemon#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] form
#   @return [String, nil]
PokemonLoadMatch = Struct.new(
  :id,
  :form,
  keyword_init: true
)

# Request payload for Pokemon#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
PokemonListMatch = Struct.new(
  :limit,
  :offset,
  keyword_init: true
)

