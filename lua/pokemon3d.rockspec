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
  summary = "Pokemon3d SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
