# Pokemon3d SDK utility: feature_add
module Pokemon3dUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
