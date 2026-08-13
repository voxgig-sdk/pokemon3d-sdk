# Pokemon3d SDK utility: make_context

from pokemon3d_sdk.core.context import Pokemon3dContext


def make_context_util(ctxmap, basectx):
    return Pokemon3dContext(ctxmap, basectx)
