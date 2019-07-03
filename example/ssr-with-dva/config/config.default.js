const resolvePath = (path) => require('path').resolve(process.cwd(), path)

module.exports = {
  keys: 'eggssr',
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  static: {
    prefix: '/',
    dir: resolvePath('dist')
  },
  routes: [
    {
      path: '/',
      exact: true,
      Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index'
    },
    {
      path: '/news/:id',
      exact: true,
      Component: () => (require('@/page/news').default),
      controller: 'page',
      handler: 'index'
    }
  ],
  baseDir: resolvePath(''),
  template: resolvePath('web/index.html'), // 使用的模版文件路径
  injectCss: (chunkName) => ([
    `<link rel='stylesheet' href='/static/css/${chunkName}.chunk.css' />`
  ]), // 客户端需要加载的静态样式表
  injectScript: (chunkName) => ([
    `<script src='/static/js/runtime~${chunkName}.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/${chunkName}.chunk.js'></script>`
  ]), // 客户端需要加载的静态资源文件表
  serverJs: (chunkName) => resolvePath(`dist/${chunkName}.server.js`)
}
