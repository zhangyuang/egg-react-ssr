'use strict'

module.exports = app => {
  const { router, controller } = app
  app.config.routes.map(route => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
}
