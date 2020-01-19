const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  static: {
    prefix: '/',
    dir: resolvePath('../dist')
  },
  baseDir: resolvePath('../'),
  // routes: [
  //   {
  //     path: '/',
  //     exact: true,
  //     Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
  //     controller: 'page',
  //     handler: 'index',
  //     entry: 'index'
  //   },
  //   {
  //     path: '/news/:id',
  //     exact: true,
  //     Component: () => (require('@/page/news').default), // 这里使用一个function包裹为了让它延迟require
  //     controller: 'page',
  //     handler: 'index',
  //     entry: 'news'
  //   }
  // ]

  routes: {
    index: [{
      path: '/',
      exact: true,
      Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index',
      entry: 'index'
    }],
    news: [{
      path: '/news/:id',
      exact: true,
      Component: () => (require('@/page/news').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index',
      entry: 'news'
    }]
  }
  
}
