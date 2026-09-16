
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Pokemon3d',
        slug: "pokemon3d",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://pokemon3d.io/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      pokemon: {
      },

    }
  }


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
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

