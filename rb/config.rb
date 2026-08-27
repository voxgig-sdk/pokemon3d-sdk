# Pokemon3d SDK configuration

module Pokemon3dConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Pokemon3d",
        "slug" => "pokemon3d",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://pokemon3d.io/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "pokemon" => {},
        },
      },
      "entity" => {
        "pokemon" => {
          "fields" => [
            {
              "name" => "availableForms",
              "short" => "All available forms for this Pokémon",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "fileSize",
              "short" => "Size of the model file in bytes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "form",
              "short" => "Current form of the Pokémon",
              "type" => "`$STRING`",
            },
            {
              "name" => "forms",
              "short" => "Available forms for this Pokémon",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "generation",
              "short" => "Generation the Pokémon belongs to",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the Pokémon",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "modelFormat",
              "short" => "Format of the 3D model",
              "type" => "`$STRING`",
            },
            {
              "name" => "modelUrl",
              "short" => "URL to the 3D model file (GLB/GLTF format)",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the Pokémon",
              "type" => "`$STRING`",
            },
            {
              "name" => "textureUrl",
              "short" => "URL to the texture file",
              "type" => "`$STRING`",
            },
            {
              "name" => "thumbnailUrl",
              "short" => "URL to the thumbnail image",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "Pokémon types",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "pokemon",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pokemons",
                  "parts" => [
                    "pokemons",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "form",
                        "orig" => "form",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pokemons/{id}",
                  "parts" => [
                    "pokemons",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "form",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    Pokemon3dFeatures.make_feature(name)
  end
end
