const config = require('../../config/config.ssr')

module.exports = function (app: any) {
  const { router } = app
  console.log('前端路由已经自动绑定，规则如下：')
  config.routes.map((route: any) => {
    console.log(route.path + ' => ' + route.controller + '.' + route.handler)
    router.get(`${route.path}`, app.generateController(`${route.controller}.${route.handler}`))
  })

}
