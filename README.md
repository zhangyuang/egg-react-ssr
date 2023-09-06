简体中文 | [English](./README_en-US.md)

# Egg + React + SSR boilerplate

<a href="https://circleci.com/gh/ykfe"><img src="https://img.shields.io/circleci/build/github/ykfe/egg-react-ssr/dev.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/ykfe/egg-react-ssr"><img src="https://codecov.io/gh/ykfe/egg-react-ssr/branch/dev/graph/badge.svg" alt="Coverage Status"></a>
<a href="https://npmcharts.com/compare/ykfe-utils"><img src="https://img.shields.io/npm/dt/ykfe-utils" alt="download"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a>
<a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="License"></a>
<a href="https://github.com/ykfe/egg-react-ssr"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<img src="https://img.shields.io/badge/node-%3E=8-green.svg" alt="Node">

> 注: 出于功能丰富度以及可维护性考虑，不再建议使用 `egg-react-ssr`。现推荐使用最新的 `ssr` 框架能够同时支持在 React, Vue2/3 场景下使用且支持使用 Vite。我们强烈建议你使用新的升级版，无论是渲染机制还是功能丰富度以及可维护性上都有极大提升并经过多个大型线上项目验证。如果你更喜欢开箱即用的体验且希望借助 Serverless 能力一键部署应用或使用 Vue2/Vue3 来做服务端渲染。项目链接 https://github.com/zhangyuang/ssr 官方文档 http://doc.ssr-fc.com/ 我们将会持续更新维护它

最小而美的服务端渲染应用模板，特点：

- 小：实现方式简洁，生产环境构建出来的 bundle 为同等复杂度的 next.js 项目的 0.7 倍，生成文件数量相比于 next.js 减少非常多
- 全：支持 HMR，支持本地开发以及生产环境 CSR/SSR 两种渲染模式无缝切换，支持定制组件的渲染模式，同时支持 TypeScript 版本
- 美：基于[React](https://reactjs.org/)和[Eggjs](https://eggjs.org/)框架，拥有强大的插件生态，配置非黑盒，方便加入当前业务的个性化逻辑

正在使用这个项目的公司（应用）名单，按新增时间排序， 如果您正在使用但名单中没有列出来的话请提 issue，欢迎推广分享。

<table>
<tr>
<td align="center"><a target="_blank" href="https://www.youku.com"><img src="https://img.alicdn.com/tfs/TB17DTuXkH0gK0jSZPiXXavapXa-680-133.svg" width="100px;" alt="优酷"/><br /><sub><b>优酷视频 
</b></sub></a></td>
<td align="center"><a target="_blank" href="https://campaign.vmate.com/vrbollywood"><img src="https://img.alicdn.com/tfs/TB17p6Vhbj1gK0jSZFOXXc7GpXa-512-512.png" width="100px;" alt="vmate 积分商城"/><br />
  <a target="_blank" href="https://job.alibaba.com/zhaopin/position_detail.htm?trace=qrcode_share&positionCode=GP524819"><sub><b>Vmate短视频
</b></a></td>
<td align="center"><a target="_blank" href="https://enjoysales.paat.com/"><img src="https://img.alicdn.com/tfs/TB1Ma0BiEY1gK0jSZFMXXaWcVXa-836-836.png" width="100px;" alt="火炽星原CRM"/><br />
<a target="_blank" href="https://enjoysales.paat.com/"><sub><b>火炽星原CRM
</b></a></td>
<td align="center"><a href="https://www.niuniuda.com/mall" target="_blank"><img src="https://img.alicdn.com/tfs/TB1df_8pBr0gK0jSZFnXXbRRXXa-160-60.png" width="100px;" alt="牛牛搭"/><br />
<a href="https://www.niuniuda.com/mall" target="_blank"><sub><b>牛牛搭
</b></a></td>
<td align="center"><a href="https://help.seewo.com/" target="_blank"><img src="https://img.alicdn.com/tfs/TB11Xo3q4v1gK0jSZFFXXb0sXXa-350-55.png" width="100px;" alt="cvte"/><br /><a href="https://help.seewo.com/" target="_blank"><sub><b>希沃帮助中心
</b></a></td>
<td align="center"><a href="https://wecard.qq.com/index/" target="_blank"><img src="https://img.alicdn.com/tfs/TB1pTZGrFT7gK0jSZFpXXaTkpXa-164-164.jpg" width="100px;" alt="腾讯微卡"/><br />
<a href="https://wecard.qq.com/index/" target="_blank"><sub><b>腾讯微卡
</b></a></td>
<td align="center"><a href="https://www.myweimai.com/#sectionOne" target="_blank"><img src="https://img.alicdn.com/tfs/TB16i3VrQT2gK0jSZPcXXcKkpXa-400-400.jpg" width="100px;" alt="微脉"/><br />
<a href="https://www.myweimai.com/#sectionOne" target="_bvlank"><sub><b>微脉
</b></a></td>
</tr>
<tr>
<td align="center"><a href="https://syzs.qq.com/" target="_blank"><img src="docs/image/syzs.png" width="100px;" alt="腾讯手游助手"/><br />
<a href="https://syzs.qq.com/" target="_bvlank"><sub><b>腾讯手游助手
</b></a></td>
<td align="center"><a href="https://kcmall.b2bwings.com/home" target="_blank"><img src="https://res.wx.qq.com/op_res/RM2YwzcAHcqxuj5HUPJK_XIYrYmlGPaSUuFGjG_qkIKonlxkVEyn4Sy_nkUWwgpkQzOXtuImQZW50yfHbFXbDQ" width="100px;" alt="国家现代农业科技创新中心"/><br />
<a href="https://kcmall.b2bwings.com/home" target="_bvlank"><sub><b>国家现代农业科技创新中心
</b></a></td>
<td align="center"><a href="https://www.gszq.com/" target="_blank"><img src="https://www.gszq.com/static/media/icon-slogan.4d1c7974.png" width="100px;" alt="国盛证券"/><br />
<a href="https://www.gszq.com/" target="_bvlank"><sub><b>国盛证券
</b></a></td>
<td align="center"><a href="https://www.66tools.com/" target="_blank"><img src="https://cdn.66tools.com/extension/chrome_qrcode_avatar.png" width="100px;" alt="极速二维码"/><br />
<a href="https://www.66tools.com/" target="_bvlank"><sub><b>极速二维码
</b></a></td>
<td align="center"><a href="https://www.100.com/" target="_blank"><img src="https://oss.bs2dl.100.com/hippo/config/f13ee98cfca7ce13888752c1261081b44bd356fd.png" width="100px;" alt="100教育"/><br />
<a href="https://www.100.com/" target="_bvlank"><sub><b>100教育
</b></a></td>
</tr>
</table>
  

## 快速入门

我们使用 [create-ssr-app](https://github.com/zhangyuang/create-ssr-app) 来快速的创建项目, 支持创建集成了 `(js|ts|antd|dva)` 等多种功能的应用模版

```bash
$ npm init ssr-app my-ssr-project --template=ssr-with-js
$ cd my-ssr-project
$ npm install
$ npm start
```

注：当 Node.js version >=15 时，应使用 `npm init ssr-app my-ssr-project -- --template=ssr-with-js ` 来传递参数
## npm scripts

1）启动服务

启动监听 7001 端口，此端口同时用于服务端渲染以及客户端渲染，通过 query 或者 config 来指定渲染模式

```bash
$ npm start # 建议以本方式启动应用，同时启动服务端渲染 + 客户端hydrate
```

2）只启动服务端渲染，此时仅服务端直出 html，没有与客户端混合的步骤

```bash
$ npm run ssr
```

3）启动客户端静态资源编译

仅限于本地开发使用，启动监听 8000 端口托管前端静态资源，相当于传统的 cra 脚手架开发模式

```bash
$ npm run csr
```

4）配套的脚本

```bash
$ npm run prod    # 使用egg-scripts模拟SSR应用生产环境，如无特殊定制要求生产环境可以用该方式启动
$ npm run build   # 打包服务端以及客户端资源文件
$ npm run analyze # 可视化分析客户端打包的资源详情
```

## 功能/特性

该模板特色为：写法简单、功能强大、一切都是组件、支持 SSR/CSR 两种渲染模式无缝切换。

更多功能/特性如下：

- [x] 基于 cra 脚手架开发，由 cra 开发的 React App 可无缝迁移，如果你熟悉 cra 的配置，上手成本几乎为 0
- [x] 小而美，相比于 beidou，next.js 这样的高度封装方案，我们的实现原理和开发模式一目了然
- [x] 推荐使用 egg 作为 Node.js 框架但并不强制，事实上你可以发现几乎无需做任何修改即可迁移到 koa,nest.js 等框架
- [x] 同时支持 SSR 以及 CSR 两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置
- [x] 支持切换路由时自动获取数据
- [x] 支持本地开发 HMR
- [x] 稳定性经过线上大规模应用验证，可提供性能优化方案
- [x] 支持 tree shaking，优化构建 bundle 大小以及数量
- [x] 支持 csr/ssr 自定义 layout，无需通过 path 来手动区分
- [x] 抛弃传统模版引擎，拥抱 React 组件，使用 JSX 来作为模版
- [x] 配套结合[antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd)的 example 的实现
- [x] 配套结合[react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable)做路由分割的 example 的实现
- [x] 配套结合[dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva)做数据管理的 example 的实现
- [x] 配套结合[ssr-with-multipage](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-multipage)多页面应用的 example
- [x] 配套结合[Rax](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-rax)版本的实现
- [x] 配套[TypeScript](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts)版本的实现

## 结合 Serverless

我们在 Serverless 场景下的[SSR 框架](https://github.com/ykfe/ssr)已经正式发布，如果你更喜欢平滑开箱即用体验的更高层次解决方案并且希望能够快速部署。推荐使用该框架进行开发。与本项目不冲突，互相补位

### 写法

在写法上统一 csr 和 ssr，采用 next 类似的静态的 getInitialProps 作为数据获取方法

```js
function Page(props) {
  return <div> {props.name} </div>
}

Page.getInitialProps = async (ctx) => {
  return Promise.resolve({
    name: 'Egg + React + SSR',
  })
}

export default Page
```

具体说明如下。

- render 是 React 的视图渲染方法
- getInitialProps 是获取数据方法，将返回值赋值给组件状态
  - csr 通过高阶组件实现
  - ssr 通过 Node 执行

在运行时，通过`config.type`来进行区分，是目前最简单的同构渲染方案。当页面初始化加载时，getInitialProps 只会加载在服务端。只有当路由跳转（Link 组件跳转或 API 方法跳转）时，客户端才会执行 getInitialProps。

getInitialProps 入参对象的属性如下：

- ctx: Node 应用请求的上下文(仅在 SSR 阶段可以获取)
- Router Props: 包含路由对象属性，包括 pathname 以及 Router params history 等对象，详细信息参考 react-router 文档

### 一切皆组件

我们的页面基础模版 html，meta 等标签皆使用 JSX 来生成，避免你去使用繁琐的模版引擎语法

```js
const commonNode = (props) =>
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? { props.children } : ''
  props.children ? (
    <div className="normal">
      <h1 className="title">
        <Link to="/">Egg + React + SSR</Link>
        <div className="author">by ykfe</div>
      </h1>
      {props.children}
    </div>
  ) : (
    ''
  )

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { serverData } = props.layoutData
    const { injectCss, injectScript } = props.layoutData.app.config
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <title>React App</title>
          {injectCss &&
            injectCss.map((item) => (
              <link rel="stylesheet" href={item} key={item} />
            ))}
        </head>
        <body>
          <div id="app">{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(
                  serverData
                )}`,
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(''),
            }}
          />
        </body>
      </html>
    )
  }
}
```

### 如何切换渲染模式

在本地开发时，你可以同时启动 ssr/csr 两种渲染模式查看区别，在生产环境时，你可以通过设置 config 中的 type 属性来切换不同的渲染模式或者通过 query 来切换，在流量较大时可以降级为 csr 渲染模式
参考文档[如何切换渲染模式](http://ykfe.surge.sh/guide/faq.html#%E5%A6%82%E4%BD%95%E5%88%87%E6%8D%A2%E6%B8%B2%E6%9F%93%E6%A8%A1%E5%BC%8F)

```bash
$ open http://localhost:7001/          # 以SSR模式渲染应用
$ open http://localhost:7001/?csr=true # 切换为CSR模式渲染或者通过config.type来设置渲染模式
```

## 执行环境

- 服务器 Node.js >= 7.6， 为了原生的使用 async/await 语法
- 浏览器版本大于等于 IE9, React 支持到 IE9，但为了更好的在 IE 下使用，你可能需要引入[Polyfill](https://reactjs.org/docs/javascript-environment-requirements.html)

## 执行流程

![](https://gw.alicdn.com/tfs/TB11BwkX8Gw3KVjSZFDXXXWEpXa-2050-1502.jpg)

### 运行配置

为了足够灵活使用，这里我们将一些关键项提供可配置的选项，可根据实际需要来配置，如无特殊必要，使用默认配置即可。服务端渲染相关配置信息我们放在 config.ssr.js，在这里我们建议不要将配置放在 egg 的配置文件当中，避免前端 bundle 中包含后端配置文件信息

```js
// config/config.ssr
const resolvePath = (path) => require('path').resolve(process.cwd(), path)

module.exports = {
    type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染,此时服务端不会做获取数据生成字符串的操作以及不会使用hydrate API
    static: {
        // 设置Node应用的静态资源目录，为了生产环境读取静态资源文件
      prefix: '/',
      dir: resolvePath('dist')
    },
    routes: [
        // 前后端统一使用的路由配置文件，防止重复编写相同的路由
      {
        path: '/', // 请求的path
        exact: true, // 是否精确匹配
        Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require, 否则Node环境无法识别前端组件中用到的import关键字会报错
        controller: 'page', // 需要调用的controller
        handler: 'index' // 需要调用的controller中具体的method
      },
      {
        path: '/news/:id',
        exact: true,
        Component: () => (require('@/page/news').default),
        controller: 'page',
        handler: 'index'
      }
    ],
    injectCss: [
    `/static/css/Page.chunk.css`
  ], // 客户端需要加载的静态样式表
  injectScript: [
    `<script src='/static/js/runtime~Page.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/Page.chunk.js'></script>`
  ], // 客户端需要加载的静态资源文件表
  serverJs: resolvePath(`dist/Page.server.js`): string|function, // 打包后的server端的bundle文件路径支持传入CDN地址, 接受直接传入require后的function
  layout: resolvePath(`dist/Layout.server.js`): string|function // 打包后的server端的bundle文件路径支持传入CDN地址, 接受直接传入require后的function
}
```

### 开发配置

修改默认 `webpack-dev-server的配置`

```js
// build/webpack.config.client.js

module.epxorts = {
  devServer: {
    // custom webpack-dev-server config
  }
}

```

## 目录结构

目录结构保持了 Egg 的方式，以 app 和 config 目录为主。将前端 React 相关代码放到 web 目录下，webpack 打包相关文件位于 build 目录。整体来看，目录不多，层级不深，属于刚刚好那种。

```bash
├── README.md
├── app # egg核心目录
│   ├── controller
│   ├── extend
│   ├── middleware
│   └── router.js # egg路由文件，无特殊需求不需要修改内容
├── app.js # egg 启动入口文件
├── build # webpack配置目录
│   ├── paths.js
│   ├── util.js
│   ├── webpack.config.base.js # 通用的webpack配置
│   ├── webpack.config.client.js # webpack客户端打包配置
│   └── webpack.config.server.js # webpack服务端打包配置
├── config # egg 配置文件目录
│   ├── config.daily.js
│   ├── config.default.js
│   ├── config.ssr.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── plugin.js
│   └── plugin.local.js
├── dist # build生成静态资源文件目录
│   ├── Page.server.js # 服务端打包后文件(即打包后的serverRender方法)
│   └── static # 前端打包后静态资源目录
└── web # 前端文件目录
    ├── assets
    │   └── common.less
    ├── entry.js # webpack打包入口文件，分环境导出不同配置
    ├── layout
    │   ├── index.js # 页面布局
    │   └── index.less
    └── page
        ├── index
        └── news
```

## Changelog

每一个版本的详细改动请查看 [release notes](https://github.com/ykfe/egg-react-ssr/releases)

## 与其他方案的对比

- 与[easy-team](https://github.com/ykfe/egg-react-ssr/wiki/与easy-team实现方案的对比)方案的对比
- 与[next.js](https://github.com/ykfe/egg-react-ssr/wiki/与next.js实现方案的对比)方案的对比

## 本地如何调试源码

请查看该[wiki](https://github.com/ykfe/egg-react-ssr/wiki/%E6%9C%AC%E5%9C%B0%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95%E6%BA%90%E7%A0%81%E5%B9%B6%E8%B4%A1%E7%8C%AE%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%A0%81)

## 如何向本项目贡献代码

请查看该[wiki](https://github.com/ykfe/egg-react-ssr/blob/master/CONTRIBUTING.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/zhangyuang"><img src="https://avatars3.githubusercontent.com/u/17424434?v=4" width="100px;" alt=""/><br /><sub><b>LeonCheung</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhangyuang" title="Code">💻</a></td>
    <td align="center"><a href="http://i5ting.com"><img src="https://avatars3.githubusercontent.com/u/3118295?v=4" width="100px;" alt=""/><br /><sub><b>狼叔</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=i5ting" title="Code">💻</a></td>
    <td align="center"><a href="http://www.lessing.online/xx-blog/"><img src="https://avatars2.githubusercontent.com/u/21156871?v=4" width="100px;" alt=""/><br /><sub><b>Xu Zhiyong</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3AJohnieXu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://ivc.me"><img src="https://avatars0.githubusercontent.com/u/16490377?v=4" width="100px;" alt=""/><br /><sub><b>Menteceso</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=ivc369" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jerryYuX"><img src="https://avatars2.githubusercontent.com/u/33367577?v=4" width="100px;" alt=""/><br /><sub><b>jerryYu</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=jerryYuX" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/qq1353709"><img src="https://avatars3.githubusercontent.com/u/7944687?v=4" width="100px;" alt=""/><br /><sub><b>dydong</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=qq1353709" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jxycbjhc"><img src="https://avatars0.githubusercontent.com/u/16661897?v=4" width="100px;" alt=""/><br /><sub><b>snoy</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=jxycbjhc" title="Documentation">📖</a></td>
    <td align="center"><a href="http://zxy.im"><img src="https://avatars2.githubusercontent.com/u/15117664?v=4" width="100px;" alt=""/><br /><sub><b>zhaoxingyue</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhaoxingyue" title="Documentation">📖</a></td>
  </tr>
  <tr>
   <td align="center"><a href="http://www.puacode.com"><img src="https://avatars3.githubusercontent.com/u/48011106?v=4" width="100px;" alt=""/><br /><sub><b>九牧</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3Adeancn175" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/JohannLai"><img src="https://avatars0.githubusercontent.com/u/10769405?v=4" width="100px;" alt=""/><br /><sub><b>JohannLai</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3AJohannLai" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/robert7git"><img src="https://avatars2.githubusercontent.com/u/6889441?v=4" width="100px;" alt=""/><br /><sub><b>robert.xu</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=robert7git" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zhusjfaker"><img src="https://avatars1.githubusercontent.com/u/31839470?v=4" width="100px;" alt=""/><br /><sub><b>zhushijie</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhusjfaker" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/c690554125"><img src="https://avatars3.githubusercontent.com/u/13865568?v=4" width="100px;" alt=""/><br /><sub><b>Cheng Zhongmin</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3Ac690554125" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](LICENSE)

## NodeParty 分享

如果你想了解本应用的设计思路，欢迎下载查看本人在 2020.1.11 日在北京 NodeParty 上所做的分享[PPT](https://github.com/ykfe/egg-react-ssr/wiki/2020-NodeParty-%E5%88%86%E4%BA%AB)，其中讨论了需要关注的一些问题的设计思路和解决方案的选取

## 答疑群

虽然我们已经尽力检查了一遍应用，但仍有可能有疏漏的地方，如果你在使用过程中发现任何问题或者建议，欢迎提[issue](https://github.com/ykfe/egg-react-ssr/issues)或者[PR](https://github.com/ykfe/egg-react-ssr/pulls)
欢迎直接扫码加入钉钉群
<img src="https://res.wx.qq.com/op_res/gQfTCN-BGtR7Luw1CjnJoJiPt7MDmyxl_G-LAyR4Wp4l8R9ISlTWj6yLuLt41zTO4nwneqdAd9g5-QnMt9qKTQ" width="300">

## 项目 Star 数增长趋势

[![Stargazers over time](https://starchart.cc/ykfe/egg-react-ssr.svg)](https://starchart.cc/ykfe/egg-react-ssr)
