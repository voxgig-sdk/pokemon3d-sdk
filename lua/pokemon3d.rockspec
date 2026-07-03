package = "voxgig-sdk-pokemon3d"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/pokemon3d-sdk.git",
  tag = "lua/v0.0.1",
  dir = "pokemon3d-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Pokemon3D public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/pokemon3d-sdk",
  issues_url = "https://github.com/voxgig-sdk/pokemon3d-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "pokemon3d" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["pokemon3d_sdk"] = "pokemon3d_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
