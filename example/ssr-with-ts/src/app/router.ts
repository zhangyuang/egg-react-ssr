const config = require('../../config/config.ssr')

module.exports = function (app: any) {
  const { router } = app
  console.log('\x1B[32m 前端路由已经自动绑定，规则如下： \x1B[39m')

  config.routes.map((route: any) => {
    console.log(`\x1B[32m ${route.path}=>${route.controller}.${route.handler} \x1B[39m `)
    router.get(`${route.path}`, app.generateController(`${route.controller}.${route.handler}`))
  })
}
