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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$ARRAY`",
            },
            {
              "name" => "fileSize",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "form",
              "type" => "`$STRING`",
            },
            {
              "name" => "forms",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "generation",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "modelFormat",
              "type" => "`$STRING`",
            },
            {
              "name" => "modelUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "textureUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "thumbnailUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
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
