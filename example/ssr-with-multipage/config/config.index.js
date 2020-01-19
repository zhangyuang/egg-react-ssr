
module.exports = {
  indexRoutes: [
    {
      path: '/',
      exact: true,
      Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index',
      entry: 'index'
    }
  ]
}
