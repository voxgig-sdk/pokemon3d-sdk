"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Pokemon3d',
        slug: "pokemon3d",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://pokemon3d.io/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            pokemon: {},
        }
    };
    entity = {
        "pokemon": {
            "fields": [
                {
                    "name": "availableForms",
                    "short": "All available forms for this Pokémon",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "fileSize",
                    "short": "Size of the model file in bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "form",
                    "short": "Current form of the Pokémon",
                    "type": "`$STRING`"
                },
                {
                    "name": "forms",
                    "short": "Available forms for this Pokémon",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "generation",
                    "short": "Generation the Pokémon belongs to",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the Pokémon",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "modelFormat",
                    "short": "Format of the 3D model",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "modelUrl",
                    "short": "URL to the 3D model file (GLB/GLTF format)",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the Pokémon",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "textureUrl",
                    "short": "URL to the texture file",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "thumbnailUrl",
                    "short": "URL to the thumbnail image",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Pokémon types",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "pokemon",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 100,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/pokemons",
                            "segments": [
                                {
                                    "lit": "pokemons"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "offset"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "pokemons"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "form",
                                        "orig": "form",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/pokemons/{id}",
                            "segments": [
                                {
                                    "lit": "pokemons"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "form",
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "pokemons",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map