
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


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
          "title": "Available Forms",
          "type": "`$ARRAY`",
          "short": "All available forms for this Pokémon"
        },
        {
          "name": "fileSize",
          "title": "File Size",
          "type": "`$INTEGER`",
          "short": "Size of the model file in bytes"
        },
        {
          "name": "form",
          "title": "Form",
          "type": "`$STRING`",
          "short": "Current form of the Pokémon"
        },
        {
          "name": "forms",
          "title": "Forms",
          "type": "`$ARRAY`",
          "short": "Available forms for this Pokémon"
        },
        {
          "name": "generation",
          "title": "Generation",
          "type": "`$INTEGER`",
          "short": "Generation the Pokémon belongs to"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the Pokémon"
        },
        {
          "name": "modelFormat",
          "title": "Model Format",
          "type": "`$STRING`",
          "short": "Format of the 3D model"
        },
        {
          "name": "modelUrl",
          "title": "Model Url",
          "type": "`$STRING`",
          "short": "URL to the 3D model file (GLB/GLTF format)",
          "format": "uri"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the Pokémon"
        },
        {
          "name": "textureUrl",
          "title": "Texture Url",
          "type": "`$STRING`",
          "short": "URL to the texture file",
          "format": "uri"
        },
        {
          "name": "thumbnailUrl",
          "title": "Thumbnail Url",
          "type": "`$STRING`",
          "short": "URL to the thumbnail image",
          "format": "uri"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$ARRAY`",
          "short": "Pokémon types"
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
              "kind": "http",
              "method": "GET",
              "orig": "/pokemons",
              "segments": [
                {
                  "lit": "pokemons"
                }
              ],
              "parts": [
                "pokemons"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 100
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "pokemons",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "form",
                  "id"
                ]
              }
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

