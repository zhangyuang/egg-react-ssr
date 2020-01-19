import { indexRoutes as Routes } from '../../config/config.index'
import { clientRender, serverRender } from '../render'

export default __isBrowser__ ? (() => {
  clientRender(Routes)
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
})() : async ctx => {
  return serverRender(ctx, Routes)
}
