package = "voxgig-sdk-pokemon3d"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/pokemon3d-sdk.git"
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
