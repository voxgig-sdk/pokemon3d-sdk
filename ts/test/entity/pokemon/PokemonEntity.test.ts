

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Pokemon3dSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PokemonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POKEMON3D_TEST_LIVE=TRUE.
  afterEach(liveDelay('POKEMON3D_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Pokemon3dSDK.test()
    const ent = testsdk.Pokemon()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POKEMON3D_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pokemon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"availableForms","req":false,"short":"All available forms for this Pokémon","type":"`$ARRAY`","index$":0},{"active":true,"name":"fileSize","req":false,"short":"Size of the model file in bytes","type":"`$INTEGER`","index$":1},{"active":true,"name":"form","req":false,"short":"Current form of the Pokémon","type":"`$STRING`","index$":2},{"active":true,"name":"forms","req":false,"short":"Available forms for this Pokémon","type":"`$ARRAY`","index$":3},{"active":true,"name":"generation","req":false,"short":"Generation the Pokémon belongs to","type":"`$INTEGER`","index$":4},{"active":true,"name":"id","req":false,"short":"Unique identifier for the Pokémon","type":"`$INTEGER`","index$":5},{"active":true,"name":"modelFormat","req":false,"short":"Format of the 3D model","type":"`$STRING`","index$":6},{"active":true,"format":"uri","name":"modelUrl","req":false,"short":"URL to the 3D model file (GLB/GLTF format)","type":"`$STRING`","index$":7},{"active":true,"name":"name","req":false,"short":"Name of the Pokémon","type":"`$STRING`","index$":8},{"active":true,"format":"uri","name":"textureUrl","req":false,"short":"URL to the texture file","type":"`$STRING`","index$":9},{"active":true,"format":"uri","name":"thumbnailUrl","req":false,"short":"URL to the thumbnail image","type":"`$STRING`","index$":10},{"active":true,"name":"type","req":false,"short":"Pokémon types","type":"`$ARRAY`","index$":11}],"id":{"field":"id","name":"id"},"name":"pokemon","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":100,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /pokemons","json":"{\"operationId\":\"getAllPokemons\",\"parameters\":[{\"description\":\"Limit the number of results returned\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":100,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Total number of Pokémon available\",\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"forms\":{\"description\":\"Available forms for this Pokémon\",\"example\":[\"regular\",\"shiny\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique identifier for the Pokémon\",\"example\":25,\"type\":\"integer\"},\"modelUrl\":{\"description\":\"URL to the 3D model file\",\"example\":\"https://pokemon3d.io/models/pikachu.glb\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the Pokémon\",\"example\":\"pikachu\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of Pokémon\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/pokemons","segments":[{"lit":"pokemons"}],"select":{"exist":["limit","offset"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"form","orig":"form","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /pokemons/{id}","json":"{\"operationId\":\"getPokemonById\",\"parameters\":[{\"description\":\"Pokémon ID or name (e.g., 25 or 'pikachu')\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Specific form of the Pokémon (e.g., 'shiny', 'alolan', 'mega')\",\"in\":\"query\",\"name\":\"form\",\"required\":false,\"schema\":{\"enum\":[\"regular\",\"shiny\",\"alolan\",\"galarian\",\"mega\",\"gigantamax\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"availableForms\":{\"description\":\"All available forms for this Pokémon\",\"example\":[\"regular\",\"shiny\",\"alolan\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"fileSize\":{\"description\":\"Size of the model file in bytes\",\"example\":524288,\"type\":\"integer\"},\"form\":{\"description\":\"Current form of the Pokémon\",\"example\":\"regular\",\"type\":\"string\"},\"generation\":{\"description\":\"Generation the Pokémon belongs to\",\"example\":1,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the Pokémon\",\"example\":25,\"type\":\"integer\"},\"modelFormat\":{\"description\":\"Format of the 3D model\",\"example\":\"glb\",\"type\":\"string\"},\"modelUrl\":{\"description\":\"URL to the 3D model file (GLB/GLTF format)\",\"example\":\"https://pokemon3d.io/models/pikachu.glb\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the Pokémon\",\"example\":\"pikachu\",\"type\":\"string\"},\"textureUrl\":{\"description\":\"URL to the texture file\",\"example\":\"https://pokemon3d.io/textures/pikachu.png\",\"format\":\"uri\",\"type\":\"string\"},\"thumbnailUrl\":{\"description\":\"URL to the thumbnail image\",\"example\":\"https://pokemon3d.io/thumbnails/pikachu.png\",\"format\":\"uri\",\"type\":\"string\"},\"type\":{\"description\":\"Pokémon types\",\"example\":[\"electric\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with Pokémon details\"},\"400\":{\"description\":\"Bad request\"},\"404\":{\"description\":\"Pokémon not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/pokemons/{id}","segments":[{"lit":"pokemons"},{"var":"id"}],"select":{"exist":["form","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"pokemon","name__orig":"pokemon","Name":"Pokemon","name_":"pokemon","name-":"pokemon","NAME":"POKEMON","index$":0}, {"active":true,"entity":"pokemon","key$":"BasicPokemonFlow","kind":"basic","name":"BasicPokemonFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pokemon_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"pokemon_ref01","srcdatavar":"pokemon_ref01_data","suffix":"_dt0"},"match":{"id":"pokemon01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pokemon_ref01"}}],"index$":1}]}, 'Pokemon')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pokemon_ref01_data = Object.values(setup.data.existing.pokemon)[0] as any

    // LIST
    const pokemon_ref01_ent = client.Pokemon()
    const pokemon_ref01_match: any = {}

    const pokemon_ref01_list = (await pokemon_ref01_ent.list(pokemon_ref01_match)).map((e: any) => e.data())


    // LOAD
    const pokemon_ref01_match_dt0: any = {}
    pokemon_ref01_match_dt0.id = pokemon_ref01_data.id
    const pokemon_ref01_data_dt0 = (await pokemon_ref01_ent.load(pokemon_ref01_match_dt0)).data()
    assert(pokemon_ref01_data_dt0.id === pokemon_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pokemon/PokemonTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Pokemon3dSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['pokemon01','pokemon02','pokemon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POKEMON3D_TEST_POKEMON_ENTID': idmap,
    'POKEMON3D_TEST_LIVE': 'FALSE',
    'POKEMON3D_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POKEMON3D_TEST_POKEMON_ENTID']

  const live = 'TRUE' === env.POKEMON3D_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POKEMON3D_TEST_POKEMON_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Pokemon3dSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.POKEMON3D_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
