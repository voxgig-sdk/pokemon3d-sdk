-- Pokemon3d SDK error

local Pokemon3dError = {}
Pokemon3dError.__index = Pokemon3dError


function Pokemon3dError.new(code, msg, ctx)
  local self = setmetatable({}, Pokemon3dError)
  self.is_sdk_error = true
  self.sdk = "Pokemon3d"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Pokemon3dError:error()
  return self.msg
end


function Pokemon3dError:__tostring()
  return self.msg
end


return Pokemon3dError
