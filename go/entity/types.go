// Typed models for the Pokemon3d SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Pokemon is the typed data model for the pokemon entity.
type Pokemon struct {
	AvailableForm *[]any `json:"available_form,omitempty"`
	FileSize *int `json:"file_size,omitempty"`
	Form *string `json:"form,omitempty"`
	Generation *int `json:"generation,omitempty"`
	Id *int `json:"id,omitempty"`
	ModelFormat *string `json:"model_format,omitempty"`
	ModelUrl *string `json:"model_url,omitempty"`
	Name *string `json:"name,omitempty"`
	TextureUrl *string `json:"texture_url,omitempty"`
	ThumbnailUrl *string `json:"thumbnail_url,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// PokemonLoadMatch is the typed request payload for Pokemon.LoadTyped.
type PokemonLoadMatch struct {
	Id string `json:"id"`
}

// PokemonListMatch is the typed request payload for Pokemon.ListTyped.
type PokemonListMatch struct {
	AvailableForm *[]any `json:"available_form,omitempty"`
	FileSize *int `json:"file_size,omitempty"`
	Form *string `json:"form,omitempty"`
	Generation *int `json:"generation,omitempty"`
	Id *int `json:"id,omitempty"`
	ModelFormat *string `json:"model_format,omitempty"`
	ModelUrl *string `json:"model_url,omitempty"`
	Name *string `json:"name,omitempty"`
	TextureUrl *string `json:"texture_url,omitempty"`
	ThumbnailUrl *string `json:"thumbnail_url,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
