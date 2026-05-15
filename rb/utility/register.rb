# Pokemon3d SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Pokemon3dUtility.registrar = ->(u) {
  u.clean = Pokemon3dUtilities::Clean
  u.done = Pokemon3dUtilities::Done
  u.make_error = Pokemon3dUtilities::MakeError
  u.feature_add = Pokemon3dUtilities::FeatureAdd
  u.feature_hook = Pokemon3dUtilities::FeatureHook
  u.feature_init = Pokemon3dUtilities::FeatureInit
  u.fetcher = Pokemon3dUtilities::Fetcher
  u.make_fetch_def = Pokemon3dUtilities::MakeFetchDef
  u.make_context = Pokemon3dUtilities::MakeContext
  u.make_options = Pokemon3dUtilities::MakeOptions
  u.make_request = Pokemon3dUtilities::MakeRequest
  u.make_response = Pokemon3dUtilities::MakeResponse
  u.make_result = Pokemon3dUtilities::MakeResult
  u.make_point = Pokemon3dUtilities::MakePoint
  u.make_spec = Pokemon3dUtilities::MakeSpec
  u.make_url = Pokemon3dUtilities::MakeUrl
  u.param = Pokemon3dUtilities::Param
  u.prepare_auth = Pokemon3dUtilities::PrepareAuth
  u.prepare_body = Pokemon3dUtilities::PrepareBody
  u.prepare_headers = Pokemon3dUtilities::PrepareHeaders
  u.prepare_method = Pokemon3dUtilities::PrepareMethod
  u.prepare_params = Pokemon3dUtilities::PrepareParams
  u.prepare_path = Pokemon3dUtilities::PreparePath
  u.prepare_query = Pokemon3dUtilities::PrepareQuery
  u.result_basic = Pokemon3dUtilities::ResultBasic
  u.result_body = Pokemon3dUtilities::ResultBody
  u.result_headers = Pokemon3dUtilities::ResultHeaders
  u.transform_request = Pokemon3dUtilities::TransformRequest
  u.transform_response = Pokemon3dUtilities::TransformResponse
}
