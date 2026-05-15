# Pokemon3d SDK exists test

require "minitest/autorun"
require_relative "../Pokemon3d_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Pokemon3dSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
