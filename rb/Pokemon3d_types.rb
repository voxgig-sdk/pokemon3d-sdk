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
# @!attribute [rw] available_form
#   @return [Array, nil]
#
# @!attribute [rw] file_size
#   @return [Integer, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] generation
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] model_format
#   @return [String, nil]
#
# @!attribute [rw] model_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] texture_url
#   @return [String, nil]
#
# @!attribute [rw] thumbnail_url
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
Pokemon = Struct.new(
  :available_form,
  :file_size,
  :form,
  :generation,
  :id,
  :model_format,
  :model_url,
  :name,
  :texture_url,
  :thumbnail_url,
  :type,
  keyword_init: true
)

# Request payload for Pokemon#load.
#
# @!attribute [rw] id
#   @return [String]
PokemonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Pokemon#list (any subset of Pokemon fields).
#
# @!attribute [rw] available_form
#   @return [Array, nil]
#
# @!attribute [rw] file_size
#   @return [Integer, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] generation
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] model_format
#   @return [String, nil]
#
# @!attribute [rw] model_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] texture_url
#   @return [String, nil]
#
# @!attribute [rw] thumbnail_url
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
PokemonListMatch = Struct.new(
  :available_form,
  :file_size,
  :form,
  :generation,
  :id,
  :model_format,
  :model_url,
  :name,
  :texture_url,
  :thumbnail_url,
  :type,
  keyword_init: true
)

