# Pokemon3d SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Pokemon3dFeatures
  def self.make_feature(name)
    case name
    when "base"
      Pokemon3dBaseFeature.new
    when "ratelimit"
      Pokemon3dRatelimitFeature.new
    when "retry"
      Pokemon3dRetryFeature.new
    when "test"
      Pokemon3dTestFeature.new
    when "timeout"
      Pokemon3dTimeoutFeature.new
    else
      Pokemon3dBaseFeature.new
    end
  end
end
