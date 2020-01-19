const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  static: {
    prefix: '/',
    dir: resolvePath('../dist')
  },
  baseDir: resolvePath('../')
}
