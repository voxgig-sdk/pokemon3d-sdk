# Pokemon3d SDK

Fetch 3D Pokemon models in GLB format for use with Three.js and other 3D engines

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Pokemon3D API

The Pokemon3D API is a community-driven service that exposes 3D Pokemon models in GLB format, intended as a drop-in alternative to traditional 2D sprite assets. The models are suitable for use with Three.js and other WebGL-based 3D engines.

What you get from the API:

- 3D Pokemon models served as downloadable GLB assets
- Multiple variant forms where available (regular, shiny, and regional variants such as Alolan)
- A simple HTTP interface for listing and retrieving models

The service is publicly hosted and does not appear to require API keys for access. As a community project, availability and reliability can vary over time.

## Try it

**TypeScript**
```bash
npm install pokemon3d
```

**Python**
```bash
pip install pokemon3d-sdk
```

**PHP**
```bash
composer require voxgig/pokemon3d-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/pokemon3d-sdk/go
```

**Ruby**
```bash
gem install pokemon3d-sdk
```

**Lua**
```bash
luarocks install pokemon3d-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { Pokemon3dSDK } from 'pokemon3d'

const client = new Pokemon3dSDK({})

// List all pokemons
const pokemons = await client.Pokemon().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o pokemon3d-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "pokemon3d": {
      "command": "/abs/path/to/pokemon3d-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Pokemon** | Individual Pokemon entries paired with their 3D GLB model assets and variant forms. | `/pokemons` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from pokemon3d_sdk import Pokemon3dSDK

client = Pokemon3dSDK({})

# List all pokemons
pokemons, err = client.Pokemon(None).list(None, None)

# Load a specific pokemon
pokemon, err = client.Pokemon(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'pokemon3d_sdk.php';

$client = new Pokemon3dSDK([]);

// List all pokemons
[$pokemons, $err] = $client->Pokemon(null)->list(null, null);

// Load a specific pokemon
[$pokemon, $err] = $client->Pokemon(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/pokemon3d-sdk/go"

client := sdk.NewPokemon3dSDK(map[string]any{})

// List all pokemons
pokemons, err := client.Pokemon(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Pokemon3d_sdk"

client = Pokemon3dSDK.new({})

# List all pokemons
pokemons, err = client.Pokemon(nil).list(nil, nil)

# Load a specific pokemon
pokemon, err = client.Pokemon(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("pokemon3d_sdk")

local client = sdk.new({})

-- List all pokemons
local pokemons, err = client:Pokemon(nil):list(nil, nil)

-- Load a specific pokemon
local pokemon, err = client:Pokemon(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Pokemon3dSDK.test()
const result = await client.Pokemon().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Pokemon3dSDK.test(None, None)
result, err = client.Pokemon(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Pokemon3dSDK::test(null, null);
[$result, $err] = $client->Pokemon(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Pokemon(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Pokemon3dSDK.test(nil, nil)
result, err = client.Pokemon(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Pokemon(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Pokemon3D API

- Upstream: [https://pokemon3d.io/api](https://pokemon3d.io/api)
- API docs: [https://freepublicapis.com/pokemon3d-api](https://freepublicapis.com/pokemon3d-api)

---

Generated from the Pokemon3D API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
