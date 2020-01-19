'use strict'

const { getEntry } = require('ykfe-utils/lib/middwares')
const { indexRoutes } = require('../config/config.index')
const { newsRoutes } = require('../config/config.news')

module.exports = app => {
  const { router, controller } = app
  indexRoutes.map(route => {
    router.get(`${route.path}`, getEntry({ entry: route.entry }), controller[route.controller][route.handler])
  })
  newsRoutes.map(route => {
    router.get(`${route.path}`, getEntry({ entry: route.entry }), controller[route.controller][route.handler])
  })
}
