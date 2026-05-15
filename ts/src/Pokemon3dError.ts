
import { Context } from './Context'


class Pokemon3dError extends Error {

  isPokemon3dError = true

  sdk = 'Pokemon3d'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Pokemon3dError
}

