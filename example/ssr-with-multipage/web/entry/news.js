import { routes as Routes } from '../router/news.js'

const clientRender = async () => {
  const render = require('./clientRender').default
  return render(Routes)
}

const serverRender = async (ctx) => {
  const render = require('./serverRender').default
  return render(ctx, Routes)
}

export default __isBrowser__ ? clientRender() : serverRender
