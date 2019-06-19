# 以流的形式返回

这一章讲述的是，当我们获取到打包后的serverRender方法后，应该如何将它渲染为流，以及和我们的模版文件结合成一个完整的流返回给客户端。使用流相较于使用字符串可以大大缩短我们的ttfb(首次请求返回)时间。同时还告诉你如何通过config的字段来切换CSR/SSR两种渲染模式。

## 流的优势

流相比一次性写到内存中，它会先写到到一个缓冲区，然后再由消费者去读取，不用将整个文件写进内存，节省了内存空间。并且可以缩短浏览器接收到响应的第一个字节的时间。

## 组合过程

这里我们要将index.html模版文件与前端组件组合为一个完整的stream返回给客户端。

介绍一下需要用到的重要模块

- [multiStream](https://www.npmjs.com/package/multistream)，可以将多个stream组合为一个stream的库，在返回时按照顺序返回，当第一个流end时，第二个流才开始start
- [string-to-stream](https://www.npmjs.com/package/string-to-stream), 将字符串转换为流的模块
- [serialize-javascript](https://www.npmjs.com/package/serialize-javascript),将js代码序列化为JSON字符串的模块

```js
//ykfe-utils/src/renderToStream.js

/** @params
 * ctx 当前请求上下文
 * chunkName 当前要渲染的页面服务端bundle
 * config 当前应用配置
 * */

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
  // 如果我们是SSR渲染模式才需要调用serverRender方法来将组件渲染为html，如果是CSR模式，我们可以省去这一步
  isLocal ? delete require.cache[config.serverJs(chunkName) : '' // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
  
  // 获取到config.default.js中的打包后的[chunkName].server.js的路径
  const serverStream = require(config.serverJs(chunkName))
  
  // 在这里我们调用serverRender方法，获取到staticRouter包裹的需要渲染的组件
  const serverRes = await serverStream.default(ctx)
  
  // 调用renderToNodeStream API来将组件渲染为字符串
  stream = global.renderToNodeStream(serverRes)
}
```

接下来我们根据模版中的锚点，来在适当位置插入一些静态资源信息，使用multiStream来将多个stream组合为一个stream，当第一个流end时，第二个流才strat。

```js
// 以<!-- Start Server Render Document -->为界限，将模版分为两部分，我们需要在中间注入一些
const docArr = baseHtml.split('<!-- Start Server Render Document -->')

const beginDoc = docArr[0].trim().replace('\n', '')
// 插入静态css文件资源，调用stringToStream模块来将字符串转换为stream
const beginDocStream = stringToStream(beginDoc.replace('<!-- Start Injecting Style Flows Up and Down -->', ` <link rel='stylesheet' href='${config.injectCss(chunkName).join('')}' />`))

// 这里通过注入window.__USESSR__告诉客户端当前使用了服务端渲染，在HOC组件以及clientRender方法中用到了该属性
// 我们通过window.__INITIAL_DATA__将服务端获取的数据注入到页面中，作为客户端hydrate的初始数据
const initialData = !isCsr ? `<script>window.__USESSR__=true;window.__INITIAL_DATA__ =${serialize(ctx.serverData || {})};</script>` : ''

// 插入静态js文件资源
const injectSrcipt = config.injectSrcipt(chunkName).join('')

const endDoc = docArr[1].trim().replace('\n', '')
const endDocStream = stringToStream(endDoc.replace('<!-- Start InitialData Script  -->', initialData).replace('<!-- Start Client Script -->', injectSrcipt))

// 如果是客户端渲染模式，这里不需要返回serverRender方法渲染得到的stream
const streamArr = isCsr ? [beginDocStream, endDocStream] : [beginDocStream, stream, endDocStream]

// 最后我们将模版生成的两份stream以及serverRender方法生成的stream，通过multiStream组合为一个完整的stream返回给浏览器端
return multiStream(streamArr)
```

## 总结

通过以上代码，我们可以很好的兼容CSR/SSR两种渲染模式，他们共用了index.html来作为自己的模版，当需要修改骨架时，无需在多个地方修改。其次当你降级为CSR渲染模式时，我们无需调用serverRender方法，这样减小了服务端的压力，在流量过大时，可以开启此选项来降级。同时我们可以发现上述代码还有一定的性能提升空间，我们最后将多个stream依次返回给了客户端，其实这里我们可以结合[bigpipe](https://github.com/bigviewjs/bigview)的理念，来实现服务端/客户端并行渲染。