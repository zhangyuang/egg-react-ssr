// import { routes } from '../../config/config.ssr'
const routes = require('../../config/config.ssr').routes.index;

const clientRender = async () => {
  const render = require('./clientRender').default
  // return render(routes.filter(route => route.entry === 'index'))
  return render(routes)
}

const serverRender = async (ctx) => {
  const render = require('./serverRender').default
  // return render(ctx, routes.filter(route => route.entry === 'index'))
  return render(ctx, routes)
}

export default __isBrowser__ ? clientRender() : serverRender
