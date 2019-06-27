module.exports = {
  routes: [
    {
      path: '/',
      exact: true,
      Component: require('@/page/index').default, // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index'
    },
    {
      path: '/news/:id',
      exact: true,
      Component: require('@/page/news').default,
      controller: 'page',
      handler: 'index'
    }
  ]
}
