
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Pokemon3d',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "fileSize",
          "type": "`$INTEGER`"
        },
        {
          "name": "form",
          "type": "`$STRING`"
        },
        {
          "name": "forms",
          "type": "`$ARRAY`"
        },
        {
          "name": "generation",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "modelFormat",
          "type": "`$STRING`"
        },
        {
          "name": "modelUrl",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "textureUrl",
          "type": "`$STRING`"
        },
        {
          "name": "thumbnailUrl",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "type": "`$ARRAY`"
        }
      ],
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
              "parts": [
                "pokemons"
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
              }
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
              "parts": [
                "pokemons",
                "{id}"
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
  config
}

