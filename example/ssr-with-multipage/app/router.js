'use strict'

const fs = require('fs')
const path = require('path')

module.exports = app => {
  const { router, controller } = app

  const root = path.resolve(process.cwd(), 'web/router')

  fs.readdirSync(root).map((filename) => {
    const { routes } = require(`${root}/${filename}`)
    routes.map((route) => {
      router.get(
        `${route.path}`, 
        async (ctx, next) => {
          ctx.entry = filename.replace('.js' , '');
          await next();
        },
        controller[route.controller][route.handler]
      )
    })
  })

}
