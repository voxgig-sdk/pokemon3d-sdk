package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Pokemon3d",
			"slug": "pokemon3d",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://pokemon3d.io/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"pokemon": map[string]any{},
			},
		},
		"entity": map[string]any{
			"pokemon": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "availableForms",
						"short": "All available forms for this Pokémon",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fileSize",
						"short": "Size of the model file in bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "form",
						"short": "Current form of the Pokémon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "forms",
						"short": "Available forms for this Pokémon",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "generation",
						"short": "Generation the Pokémon belongs to",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the Pokémon",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modelFormat",
						"short": "Format of the 3D model",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "modelUrl",
						"short": "URL to the 3D model file (GLB/GLTF format)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the Pokémon",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "textureUrl",
						"short": "URL to the texture file",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "thumbnailUrl",
						"short": "URL to the thumbnail image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Pokémon types",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "pokemon",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/pokemons",
								"segments": []any{
									map[string]any{
										"lit": "pokemons",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"pokemons",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/pokemons/{id}",
								"segments": []any{
									map[string]any{
										"lit": "pokemons",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"form",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"pokemons",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
