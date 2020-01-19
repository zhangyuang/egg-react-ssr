import { Context } from 'midway'
import { KoaMiddleware } from '@midwayjs/decorator'

interface Options {
  entry: string
}

export const getEntry = (options: Options): KoaMiddleware<Context> => {
  return async function getEntry (ctx, next) {
    ctx.entry = options.entry
    await next()
  }
}
