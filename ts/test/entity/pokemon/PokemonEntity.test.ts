

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"availableForms":{"a":true,"h":"Available Forms","n":"availableForms","r":false,"sh":"All available forms for this Pokémon","t":"`$ARRAY`","key$":"availableForms","index$":0},"fileSize":{"a":true,"h":"File Size","n":"fileSize","r":false,"sh":"Size of the model file in bytes","t":"`$INTEGER`","key$":"fileSize","index$":1},"form":{"a":true,"h":"Form","n":"form","r":false,"sh":"Current form of the Pokémon","t":"`$STRING`","key$":"form","index$":2},"forms":{"a":true,"h":"Forms","n":"forms","r":false,"sh":"Available forms for this Pokémon","t":"`$ARRAY`","key$":"forms","index$":3},"generation":{"a":true,"h":"Generation","n":"generation","r":false,"sh":"Generation the Pokémon belongs to","t":"`$INTEGER`","key$":"generation","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the Pokémon","t":"`$INTEGER`","key$":"id","index$":5},"modelFormat":{"a":true,"h":"Model Format","n":"modelFormat","r":false,"sh":"Format of the 3D model","t":"`$STRING`","key$":"modelFormat","index$":6},"modelUrl":{"a":true,"fo":"uri","h":"Model Url","n":"modelUrl","r":false,"sh":"URL to the 3D model file (GLB/GLTF format)","t":"`$STRING`","key$":"modelUrl","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the Pokémon","t":"`$STRING`","key$":"name","index$":8},"textureUrl":{"a":true,"fo":"uri","h":"Texture Url","n":"textureUrl","r":false,"sh":"URL to the texture file","t":"`$STRING`","key$":"textureUrl","index$":9},"thumbnailUrl":{"a":true,"fo":"uri","h":"Thumbnail Url","n":"thumbnailUrl","r":false,"sh":"URL to the thumbnail image","t":"`$STRING`","key$":"thumbnailUrl","index$":10},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Pokémon types","t":"`$ARRAY`","key$":"type","index$":11}},"id":{"field":"id","name":"id"},"name":"pokemon","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /pokemons","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/pokemons","q":{"exist":["limit","offset"]},"r":{},"s":[{"lit":"pokemons"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /pokemons/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"form","or":"form","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/pokemons/{id}","q":{"exist":["form","id"]},"r":{},"s":[{"lit":"pokemons"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"pokemon","name__orig":"pokemon","Name":"Pokemon","name_":"pokemon","name-":"pokemon","NAME":"POKEMON","index$":0}, {"active":true,"entity":"pokemon","key$":"BasicPokemonFlow","kind":"basic","name":"BasicPokemonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pokemon_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"pokemon_ref01","srcdatavar":"pokemon_ref01_data","suffix":"_dt0"},"m":{"id":"pokemon01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pokemon_ref01"}}],"index$":1}]}, 'Pokemon', {"GET /pokemons":{"protocol":"http","operationId":"getAllPokemons","responses":{"200":{"description":"Successful response with list of Pokémon","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"description":"Total number of Pokémon available","key$":"count","type":"integer"},"results":{"items":{"properties":{"forms":{"description":"Available forms for this Pokémon","example":["regular","shiny"],"items":{"type":"string"},"type":"array","key$":"forms"},"id":{"description":"Unique identifier for the Pokémon","example":25,"type":"integer","key$":"id"},"modelUrl":{"description":"URL to the 3D model file","example":"https://pokemon3d.io/models/pikachu.glb","format":"uri","type":"string","key$":"modelUrl"},"name":{"description":"Name of the Pokémon","example":"pikachu","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/Pokemon","index$":0},"key$":"results","type":"array"}}}}}},"400":{"description":"Bad request"},"500":{"description":"Internal server error"}},"parameters":[{"name":"limit","in":"query","description":"Limit the number of results returned","required":false,"schema":{"type":"integer","default":100},"index$":0},{"name":"offset","in":"query","description":"Offset for pagination","required":false,"schema":{"type":"integer","default":0},"index$":1}],"securitySource":"unspecified"},"GET /pokemons/{id}":{"protocol":"http","operationId":"getPokemonById","responses":{"200":{"description":"Successful response with Pokémon details","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the Pokémon","example":25,"key$":"id"},"name":{"type":"string","description":"Name of the Pokémon","example":"pikachu","key$":"name"},"form":{"type":"string","description":"Current form of the Pokémon","example":"regular","key$":"form"},"modelUrl":{"type":"string","description":"URL to the 3D model file (GLB/GLTF format)","format":"uri","example":"https://pokemon3d.io/models/pikachu.glb","key$":"modelUrl"},"textureUrl":{"type":"string","description":"URL to the texture file","format":"uri","example":"https://pokemon3d.io/textures/pikachu.png","key$":"textureUrl"},"thumbnailUrl":{"type":"string","description":"URL to the thumbnail image","format":"uri","example":"https://pokemon3d.io/thumbnails/pikachu.png","key$":"thumbnailUrl"},"type":{"type":"array","description":"Pokémon types","items":{"type":"string"},"example":["electric"],"key$":"type"},"generation":{"type":"integer","description":"Generation the Pokémon belongs to","example":1,"key$":"generation"},"availableForms":{"type":"array","description":"All available forms for this Pokémon","items":{"type":"string"},"example":["regular","shiny","alolan"],"key$":"availableForms"},"modelFormat":{"type":"string","description":"Format of the 3D model","example":"glb","key$":"modelFormat"},"fileSize":{"type":"integer","description":"Size of the model file in bytes","example":524288,"key$":"fileSize"}},"x-ref":"#/components/schemas/PokemonDetail","index$":0}}}},"400":{"description":"Bad request"},"404":{"description":"Pokémon not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","description":"Pokémon ID or name (e.g., 25 or 'pikachu')","required":true,"schema":{"type":"string"},"index$":0},{"name":"form","in":"query","description":"Specific form of the Pokémon (e.g., 'shiny', 'alolan', 'mega')","required":false,"schema":{"type":"string","enum":["regular","shiny","alolan","galarian","mega","gigantamax"]},"index$":1}],"securitySource":"unspecified"}})
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
  
