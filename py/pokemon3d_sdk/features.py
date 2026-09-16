# Pokemon3d SDK feature factory

from pokemon3d_sdk.feature.base_feature import Pokemon3dBaseFeature
from pokemon3d_sdk.feature.ratelimit_feature import Pokemon3dRatelimitFeature
from pokemon3d_sdk.feature.retry_feature import Pokemon3dRetryFeature
from pokemon3d_sdk.feature.test_feature import Pokemon3dTestFeature
from pokemon3d_sdk.feature.timeout_feature import Pokemon3dTimeoutFeature


_FEATURES = {
    "base": lambda: Pokemon3dBaseFeature(),
    "ratelimit": lambda: Pokemon3dRatelimitFeature(),
    "retry": lambda: Pokemon3dRetryFeature(),
    "test": lambda: Pokemon3dTestFeature(),
    "timeout": lambda: Pokemon3dTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
