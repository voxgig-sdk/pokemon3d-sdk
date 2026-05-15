<?php
declare(strict_types=1);

// Pokemon3d SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

Pokemon3dUtility::setRegistrar(function (Pokemon3dUtility $u): void {
    $u->clean = [Pokemon3dClean::class, 'call'];
    $u->done = [Pokemon3dDone::class, 'call'];
    $u->make_error = [Pokemon3dMakeError::class, 'call'];
    $u->feature_add = [Pokemon3dFeatureAdd::class, 'call'];
    $u->feature_hook = [Pokemon3dFeatureHook::class, 'call'];
    $u->feature_init = [Pokemon3dFeatureInit::class, 'call'];
    $u->fetcher = [Pokemon3dFetcher::class, 'call'];
    $u->make_fetch_def = [Pokemon3dMakeFetchDef::class, 'call'];
    $u->make_context = [Pokemon3dMakeContext::class, 'call'];
    $u->make_options = [Pokemon3dMakeOptions::class, 'call'];
    $u->make_request = [Pokemon3dMakeRequest::class, 'call'];
    $u->make_response = [Pokemon3dMakeResponse::class, 'call'];
    $u->make_result = [Pokemon3dMakeResult::class, 'call'];
    $u->make_point = [Pokemon3dMakePoint::class, 'call'];
    $u->make_spec = [Pokemon3dMakeSpec::class, 'call'];
    $u->make_url = [Pokemon3dMakeUrl::class, 'call'];
    $u->param = [Pokemon3dParam::class, 'call'];
    $u->prepare_auth = [Pokemon3dPrepareAuth::class, 'call'];
    $u->prepare_body = [Pokemon3dPrepareBody::class, 'call'];
    $u->prepare_headers = [Pokemon3dPrepareHeaders::class, 'call'];
    $u->prepare_method = [Pokemon3dPrepareMethod::class, 'call'];
    $u->prepare_params = [Pokemon3dPrepareParams::class, 'call'];
    $u->prepare_path = [Pokemon3dPreparePath::class, 'call'];
    $u->prepare_query = [Pokemon3dPrepareQuery::class, 'call'];
    $u->result_basic = [Pokemon3dResultBasic::class, 'call'];
    $u->result_body = [Pokemon3dResultBody::class, 'call'];
    $u->result_headers = [Pokemon3dResultHeaders::class, 'call'];
    $u->transform_request = [Pokemon3dTransformRequest::class, 'call'];
    $u->transform_response = [Pokemon3dTransformResponse::class, 'call'];
});
