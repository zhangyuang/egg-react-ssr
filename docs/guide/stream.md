# 以流的形式返回

这一章讲述的是，当我们获取到打包后的serverRender方法后，应该如何调用，来将我们想要给结果返回给浏览器端。

## 组合过程

```js
//ykfe-utils/src/renderToStream.js
const multiStream = require('multistream')
const fs = require('fs')
const stringToStream = require('string-to-stream')
const serialize = require('serialize-javascript')

const renderToStream = async (ctx, chunkName, config) => {
    // 这里我们接收三个参数，分别是当前请求的上下文，当前要渲染的页面的chunkName(即webpack的entry的键名)，config当前应用的配置
  const baseDir = config.baseDir || process.cwd() //获取当前应用的路径
  const isLocal = config.env === 'local' // 当前是否是本地开发环境
  const isCsr = config.type === 'csr' // 当前渲染模式是客户端渲染还是服务端渲染
  const baseHtml = fs.readFileSync(config.template, 'utf-8').toString() //首先获取到模版文件的内容
  if (!global.renderToNodeStream) {
      // 这块是为了保证服务端用的react-dom与客户端用的是同一份代码，否则使用react-hooks的时候会报错
      // 详情请参考issue: https://github.com/ykfe/egg-react-ssr/issues/4
    const ReactDOMServer = require(baseDir + '/node_modules/react-dom/server')
    const { renderToNodeStream } = ReactDOMServer
    global.renderToNodeStream = renderToNodeStream
  }
  let stream
  if (!isCsr) {
    if (isLocal) {
      // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
      delete require.cache[config.serverJs(chunkName)]
    }
    // 如果当前是服务端渲染模式，我们需要require打包后的[chunkName].server.js导出的模块，即打包后的serverRender方法，客户端模式不需要服务端直出html可以省去这一步
    const serverStream = require(config.serverJs(chunkName))
    // 在这里我们调用serverRender方法，获取到staticRouter包裹的需要渲染的组件
    const serverRes = await serverStream.default(ctx)
    // 调用renderToNodeStream API来将组件渲染为字符串
    stream = global.renderToNodeStream(serverRes)
  }
    // 接下来我们根据模版中的锚点，来插入一些静态资源信息
  const docArr = baseHtml.split('<!-- Start Server Render Document -->')

  const beginDoc = docArr[0].trim().replace('\n', '')
  // 插入静态css文件资源，调用stringToStream模块来将字符串转换为stream
  const beginDocStream = stringToStream(beginDoc.replace('<!-- Start Injecting Style Flows Up and Down -->', ` <link rel='stylesheet' href='${config.injectCss(chunkName).join('')}' />`))
  // 这里通过注入window.__USESSR__告诉客户端当前使用了服务端渲染，在HOC组件以及clientRender方法中用到了该属性
  // 接着我们将服务端获取的数据注入到页面中，作为客户端hydrate的初始数据
  const initialData = !isCsr ? `<script>window.__USESSR__=true;window.__INITIAL_DATA__ =${serialize(ctx.serverData || {})};</script>` : ''
  // 插入静态js文件资源
  const injectSrcipt = config.injectSrcipt(chunkName).join('')

  const endDoc = docArr[1].trim().replace('\n', '')
  const endDocStream = stringToStream(endDoc.replace('<!-- Start InitialData Script  -->', initialData).replace('<!-- Start Client Script -->', injectSrcipt))
  // 如果是客户端渲染模式，这里不需要返回serverRender方法渲染得到的stream
  const streamArr = isCsr ? [beginDocStream, endDocStream] : [beginDocStream, stream, endDocStream]
  // 最后我们将模版生成的两份stream以及serverRender方法生成的stream，通过multiStream组合为一个完整的stream返回给浏览器端
  return multiStream(streamArr)
}

export default renderToStream

```

## 优势

通过以上代码，我们可以很好的兼容CSR/SSR两种渲染模式，他们共用了index.html来作为自己的模版，当需要修改骨架时，无需在多个地方修改。其次当你降级为CSR渲染模式时，我们无需调用serverRender方法，这样减小了服务端的压力，在流量过大时，可以开启此选项来降级。