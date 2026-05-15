# Pokemon3d SDK feature factory

from feature.base_feature import Pokemon3dBaseFeature
from feature.test_feature import Pokemon3dTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Pokemon3dBaseFeature(),
        "test": lambda: Pokemon3dTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
