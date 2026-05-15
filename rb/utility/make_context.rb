# Pokemon3d SDK utility: make_context
require_relative '../core/context'
module Pokemon3dUtilities
  MakeContext = ->(ctxmap, basectx) {
    Pokemon3dContext.new(ctxmap, basectx)
  }
end
