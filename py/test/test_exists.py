# ProjectName SDK exists test

import pytest
from pokemon3d_sdk import Pokemon3dSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Pokemon3dSDK.test(None, None)
        assert testsdk is not None
