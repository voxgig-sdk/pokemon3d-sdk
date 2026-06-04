# Pokemon entity test

require "minitest/autorun"
require "json"
require_relative "../Pokemon3d_sdk"
require_relative "runner"

class PokemonEntityTest < Minitest::Test
  def test_create_instance
    testsdk = Pokemon3dSDK.test(nil, nil)
    ent = testsdk.Pokemon(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = pokemon_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "pokemon." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set POKEMON_D_TEST_POKEMON_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    pokemon_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.pokemon")))
    pokemon_ref01_data = nil
    if pokemon_ref01_data_raw.length > 0
      pokemon_ref01_data = Helpers.to_map(pokemon_ref01_data_raw[0][1])
    end

    # LIST
    pokemon_ref01_ent = client.Pokemon(nil)
    pokemon_ref01_match = {}

    pokemon_ref01_list_result, err = pokemon_ref01_ent.list(pokemon_ref01_match, nil)
    assert_nil err
    assert pokemon_ref01_list_result.is_a?(Array)

    # LOAD
    pokemon_ref01_match_dt0 = {
      "id" => pokemon_ref01_data["id"],
    }
    pokemon_ref01_data_dt0_loaded, err = pokemon_ref01_ent.load(pokemon_ref01_match_dt0, nil)
    assert_nil err
    pokemon_ref01_data_dt0_load_result = Helpers.to_map(pokemon_ref01_data_dt0_loaded)
    assert !pokemon_ref01_data_dt0_load_result.nil?
    assert_equal pokemon_ref01_data_dt0_load_result["id"], pokemon_ref01_data["id"]

  end
end

def pokemon_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "pokemon", "PokemonTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = Pokemon3dSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["pokemon01", "pokemon02", "pokemon03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["POKEMON_D_TEST_POKEMON_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "POKEMON_D_TEST_POKEMON_ENTID" => idmap,
    "POKEMON_D_TEST_LIVE" => "FALSE",
    "POKEMON_D_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["POKEMON_D_TEST_POKEMON_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["POKEMON_D_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = Pokemon3dSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["POKEMON_D_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["POKEMON_D_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
