
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
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://pokemon3d.io/api',

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
          "active": true,
          "name": "available_form",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "file_size",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "form",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "generation",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "model_format",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "model_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "texture_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "thumbnail_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 10
        }
      ],
      "name": "pokemon",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 100,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "form",
                    "orig": "form",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

