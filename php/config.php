<?php
declare(strict_types=1);

// Pokemon3d SDK configuration

class Pokemon3dConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Pokemon3d",
                "slug" => "pokemon3d",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://pokemon3d.io/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "pokemon" => [],
                ],
            ],
            "entity" => [
        'pokemon' => [
          'fields' => [
            [
              'name' => 'availableForms',
              'short' => 'All available forms for this Pokémon',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'fileSize',
              'short' => 'Size of the model file in bytes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'form',
              'short' => 'Current form of the Pokémon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'forms',
              'short' => 'Available forms for this Pokémon',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'generation',
              'short' => 'Generation the Pokémon belongs to',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the Pokémon',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'modelFormat',
              'short' => 'Format of the 3D model',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'modelUrl',
              'short' => 'URL to the 3D model file (GLB/GLTF format)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the Pokémon',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'textureUrl',
              'short' => 'URL to the texture file',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'thumbnailUrl',
              'short' => 'URL to the thumbnail image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Pokémon types',
              'type' => '`$ARRAY`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'pokemon',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/pokemons',
                  'segments' => [
                    [
                      'lit' => 'pokemons',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'pokemons',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'form',
                        'orig' => 'form',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/pokemons/{id}',
                  'segments' => [
                    [
                      'lit' => 'pokemons',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'form',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'pokemons',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Pokemon3dFeatures::make_feature($name);
    }
}
