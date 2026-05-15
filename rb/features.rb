# Pokemon3d SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Pokemon3dFeatures
  def self.make_feature(name)
    case name
    when "base"
      Pokemon3dBaseFeature.new
    when "test"
      Pokemon3dTestFeature.new
    else
      Pokemon3dBaseFeature.new
    end
  end
end
