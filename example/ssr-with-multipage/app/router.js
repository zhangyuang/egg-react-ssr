'use strict'

const config = require('../config/config.ssr')

module.exports = app => {
  const { router, controller } = app

  // config.routes.map(route => {
  //   router.get(route.path, 
  //     async (ctx, next) => {
  //       ctx.entry = route.entry;
  //       await next();
  //     },
  //     controller[route.controller][route.handler]
  //   )
  // })

  Object.keys(config.routes).map(entry => {
    const routes = config.routes[entry]
    routes.map((route) => {
      router.get(route.path, 
        async (ctx, next) => {
          ctx.entry = entry;
          await next();
        },
        controller[route.controller][route.handler]
      )
    })
  })
}
