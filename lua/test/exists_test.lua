-- Pokemon3d SDK exists test

local sdk = require("pokemon3d_sdk")

describe("Pokemon3dSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
