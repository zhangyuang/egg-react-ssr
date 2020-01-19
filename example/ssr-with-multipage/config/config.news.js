
module.exports = {
  newsRoutes: [
    {
      path: '/news/:id',
      exact: true,
      Component: () => (require('@/page/news').default),
      controller: 'page',
      handler: 'index',
      entry: 'news'
    }
  ]
}
