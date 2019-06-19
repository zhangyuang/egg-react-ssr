# Egg + React + SSR应用骨架

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

最小而美的服务端渲染应用骨架，特点

- 小：实现方式简洁，生产环境构建出来的bundle为同等复杂度的next.js项目的0.4倍，文件数量相比于next.js减少非常多
- 全：支持HMR，同时支持本地开发以及生产环境CSR/SSR两种渲染模式无缝切换，支持定制特定组件的渲染模式
- 美：基于[React](https://reactjs.org/)和[Eggjs](https://eggjs.org/)框架，拥有强大的插件生态，配置非黑盒，且一切关键位置皆可通过config.default.js来配置

## 快速入门

这里我们提供了一个脚手架，方便你创建快速项目。

```
$ npm install yk-cli -g
$ ykcli init <Your Project Name>
$ cd <Your Project Name>
$ npm i
$ npm start
$ open http://localhost:7001
```

## 功能/特性

这个项目骨架的特色是写法简单，功能强大，相关特性、原理也会在本节一一说明。

### 写法

在写法上统一csr和ssr，采用next类似的静态的getInitialProps作为数据获取方法

```
function Page(props) {
  return <div> {props.name} </div>
}

Page.getInitialProps = async (ctx) => {
  return Promise.resolve({
    name: 'Egg + React + SSR'
  })
}

export default Page
```

具体说明如下。

- render是React的视图渲染方法
- getInitialProps是获取数据方法，将返回值赋值给组件状态
    - csr通过高阶组件实现
    - ssr通过Node执行

在运行时，通过`npm run csr`和`npm run ssr`来进行区分，是目前最简单的同构渲染方案。当页面初始化加载时，getInitialProps只会加载在服务端。只有当路由跳转（Link组件跳转或 API 方法跳转）时，客户端才会执行getInitialProps。

getInitialProps入参对象的属性如下：

- ctx: Node应用请求的上下文(仅在SSR阶段可以获取)
- Router Props: 路由信息，包括pathname以及Router params等信息，详细信息参考react-router文档

### 特性

- [x] 基于cra脚手架开发，由cra开发的React App可无缝迁移，如果你熟悉cra的配置，上手成本几乎为0
- [x] 小而美，相比于beidou，next.js这样的高度封装方案，我们的实现原理和开发模式一目了然
- [x] 同时支持SSR以及CSR两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置
- [x] 支持切换路由时自动获取数据
- [x] 支持本地开发HMR
- [x] 稳定性经过线上大规模应用验证，可提供性能优化方案
- [x] 支持tree shaking以及打包去重依赖，使得打包的bundle非常小，为同样复杂度的next.js项目的0.4倍
- [x] 支持csr/ssr自定义layout，无需通过path来手动区分
- [ ] 配套[TypeScript](https://github.com/ykfe/egg-react-ssr-typescript)版本的实现
- [ ] 配套serverless版本的实现

### 执行流程

![](https://gw.alicdn.com/tfs/TB11BwkX8Gw3KVjSZFDXXXWEpXa-2050-1502.jpg)


### 配置

为了足够灵活使用，这里我们将一些关键项提供可配置的选项，可根据实际需要来配置，如无特殊必要，使用默认配置即可。由于项目是基于Egg的，所以配置信息统一放在config.default.js。

```js
const resolvePath = (path) => require('path').resolve(process.cwd(), path)

module.exports = {
    keys: 'eggssr',
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
    template: resolvePath('web/index.html'), // 使用的模版文件路径
    injectCss: (chunkName) => ([
      `/static/css/${chunkName}.chunk.css`
    ]), // 客户端需要加载的静态css文件资源
    injectScript: (chunkName) => ([
      `<script src='/static/js/runtime~${chunkName}.js'></script>`,
      `<script src='/static/js/vendor.chunk.js'></script>`,
      `<script src='/static/js/${chunkName}.chunk.js'></script>`
    ]), // 客户端需要加载的静态js文件资源
    serverJs: (chunkName) => resolvePath(`dist/${chunkName}.server.js`) // 服务端需要使用的打包后的serverRender方法js文件的路径
}
```

## 目录结构

目录结构保持了Egg的方式，以app和config目录为主。将前端React相关代码放到web目录下，webpack打包相关文件位于build目录。整体来看，目录不多，层级不深，属于刚刚好那种。

```
├── README.md
├── app // egg核心目录
│   ├── controller
│   ├── extend
│   ├── middleware
│   └── router.js // egg路由文件，无特殊需求不需要修改内容
├── app.js // egg 启动入口文件
├── build // webpack配置目录
│   ├── env.js
│   ├── jest
│   ├── paths.js
│   ├── util.js
│   ├── webpack.config.base.js // 通用的webpack配置
│   ├── webpack.config.client.js // webpack客户端打包配置
│   └── webpack.config.server.js // webpack服务端打包配置
├── config // egg 配置文件目录
│   ├── config.daily.js
│   ├── config.default.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── config.staging.js
│   ├── plugin.js
│   └── plugin.local.js
├── dist // build生成静态资源文件目录
│   ├── Page.server.js // 服务端打包后文件(即打包后的serverRender方法)
│   └── static // 前端打包后静态资源目录
└── web // 前端文件目录
    ├── assets
    │   └── common.less
    ├── entry.js // webpack打包入口文件，分环境导出不同配置
    ├── index.html // 页面骨架模版
    ├── layout
    │   ├── index.js // 页面布局
    │   └── index.less
    └── page
        ├── index
        └── news
```

## npm scripts

1）启动服务端渲染

启动监听7001端口，只启动服务端渲染，此时仅服务端直出html，没有与客户端混合的步骤

```
$ npm run ssr 
```

2）启动客户端渲染

启动监听8000端口，只启动客户端渲染，相当于传统的cra脚手架开发模式

```
$ npm run csr 
```

3）同时启动csr和ssr方式。

```
$ npm start // 启动监听7001端口，建议使用方式，同时启动服务端渲染 + 客户端hydrate
```

4）配套的脚本

```
$ npm run prod // 模拟SSR应用生产环境
$ npm run build // 打包服务端以及客户端资源文件
$ npm run analyze // 可视化分析客户端打包的资源详情
```

## 与其他方案的对比

- 与[easy-team](https://github.com/ykfe/egg-react-ssr/wiki/与easy-team实现方案的对比)方案的对比  
- 与[next.js](https://github.com/ykfe/egg-react-ssr/wiki/与next.js实现方案的对比)方案的对比

## 答疑群

虽然我们已经尽力检查了一遍应用，但仍有可能有疏漏的地方，如果你在使用过程中发现任何问题或者建议，欢迎提[issue](https://github.com/ykfe/egg-react-ssr/issues)或者[PR](https://github.com/ykfe/egg-react-ssr/pulls)
欢迎直接扫码加入钉钉群
<img src="https://img.alicdn.com/tfs/TB1CONSclGE3KVjSZFhXXckaFXa-750-990.jpg" width="300">

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/zhangyuang"><img src="https://avatars3.githubusercontent.com/u/17424434?v=4" width="100px;" alt="LeonCheung"/><br /><sub><b>LeonCheung</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhangyuang" title="Code">💻</a></td><td align="center"><a href="http://i5ting.com"><img src="https://avatars3.githubusercontent.com/u/3118295?v=4" width="100px;" alt="狼叔"/><br /><sub><b>狼叔</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=i5ting" title="Code">💻</a></td><td align="center"><a href="http://www.lessing.online/xx-blog/"><img src="https://avatars2.githubusercontent.com/u/21156871?v=4" width="100px;" alt="Xu Zhiyong"/><br /><sub><b>Xu Zhiyong</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3AJohnieXu" title="Bug reports">🐛</a></td><td align="center"><a href="http://zxy.im"><img src="https://avatars2.githubusercontent.com/u/15117664?v=4" width="100px;" alt="zhaoxingyue"/><br /><sub><b>zhaoxingyue</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhaoxingyue" title="Code">💻</a></td><td align="center"><a href="https://github.com/zhusjfaker"><img src="https://avatars1.githubusercontent.com/u/31839470?v=4" width="100px;" alt="zhushijie"/><br /><sub><b>zhushijie</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhusjfaker" title="Code">💻</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
