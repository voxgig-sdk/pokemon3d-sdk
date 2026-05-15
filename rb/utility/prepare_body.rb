# Pokemon3d SDK utility: prepare_body
module Pokemon3dUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
