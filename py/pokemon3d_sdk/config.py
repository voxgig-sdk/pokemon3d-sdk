# Pokemon3d SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Pokemon3d",
            "slug": "pokemon3d",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://pokemon3d.io/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "pokemon": {},
            },
        },
        "entity": {
      "pokemon": {
        "fields": [
          {
            "name": "availableForms",
            "short": "All available forms for this Pokémon",
            "type": "`$ARRAY`",
          },
          {
            "name": "fileSize",
            "short": "Size of the model file in bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "form",
            "short": "Current form of the Pokémon",
            "type": "`$STRING`",
          },
          {
            "name": "forms",
            "short": "Available forms for this Pokémon",
            "type": "`$ARRAY`",
          },
          {
            "name": "generation",
            "short": "Generation the Pokémon belongs to",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the Pokémon",
            "type": "`$INTEGER`",
          },
          {
            "name": "modelFormat",
            "short": "Format of the 3D model",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "modelUrl",
            "short": "URL to the 3D model file (GLB/GLTF format)",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Name of the Pokémon",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "textureUrl",
            "short": "URL to the texture file",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "thumbnailUrl",
            "short": "URL to the thumbnail image",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Pokémon types",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/pokemons",
                "segments": [
                  {
                    "lit": "pokemons",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "pokemons",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/pokemons/{id}",
                "segments": [
                  {
                    "lit": "pokemons",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "form",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "pokemons",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
