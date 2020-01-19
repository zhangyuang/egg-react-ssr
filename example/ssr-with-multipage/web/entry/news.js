import { newsRoutes as Routes } from '../../config/config.news'
import { clientRender, serverRender } from '../render'

export default __isBrowser__ ? (() => {
  clientRender(Routes)
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
})() : async ctx => {
  return serverRender(ctx, Routes)
}
