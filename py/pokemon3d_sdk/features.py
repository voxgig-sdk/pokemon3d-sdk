# Pokemon3d SDK feature factory

from pokemon3d_sdk.feature.base_feature import Pokemon3dBaseFeature
from pokemon3d_sdk.feature.test_feature import Pokemon3dTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Pokemon3dBaseFeature(),
        "test": lambda: Pokemon3dTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
