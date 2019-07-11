# 介绍

该骨架是我们团队通过开发业务上的React SSR应用提取出来的一个基础的Egg + React + SSR 应用的实现，本文档会详细介绍一个完整的Egg + React + SSR 应用的开发流程, 我们力求该应用的实现方式比目前市面上任何框架的实现方式都要简单，同时做到做到本文档详细程度超过目前市面上的任何一篇文章同时涉及到一些源码讲解，不但教你如何做，还会教你为什么要这样做以及原理是什么。

## 初衷

由于React官方缺少完整的SSR(Server-Side Rendering)文档，只是简单的介绍了一下需要用到的API, 同时网络上的文章也良莠不齐，大都是十分简略的实现方式，无法适用于大规模的线上应用。

本文档假设你已经熟悉React本身，并且具有 Node.js 和 webpack 的一定使用经验。即使不多也没关系，我们尽量以通俗易懂的方式来将这些代码解释的很详细。如果你倾向于使用提供了平滑开箱即用体验的更高层次解决方案，你应该去尝试使用[umi.js](https://umijs.org/zh/)。事实上它的[SSR PR](https://github.com/umijs/umi/pull/2543)方案大部分也是我们贡献的。它是企业级 react 应用框架，支持约定式路由，开箱即用。但是，如果你需要更直接地控制应用程序的结构，umi.js 并不适合这种使用场景。无论如何，阅读本文档将更有助于更好地了解一切如何运行。

最后，请注意，本文档中的解决方案不是限定的,但是经过多次优化我们发现它们对我们来说很好，但这并不意味着无法继续改进。可能会在未来持续改进，欢迎提交 [pull request](https://github.com/ykfe/egg-react-ssr/pulls) 作出贡献！

## 技术栈

[Egg](https://eggjs.org/zh-cn/intro/index.html)企业级Node.js框架, 基于 Koa 开发，性能优异,高度可扩展的插件机制,内置多进程管理

[React](https://react.docschina.org/)目前最流行的前端框架之一

[ReactDOMServer](https://reactjs.org/docs/react-dom-server.html)React官方提供的服务端渲染有关的库

## 执行环境

- 服务器Node.js >= 7.6， 为了原生的使用async/await语法
- 浏览器版本大于等于IE9, React支持到IE9，但为了更好的在IE下使用，你可能需要引入[Polyfill](https://reactjs.org/docs/javascript-environment-requirements.html)

## 功能/特性

以下是该应用具有的功能点

### 已完成

- 基于cra脚手架开发，由cra开发的React App可无缝迁移，如果你熟悉cra的配置，上手成本几乎为0
- 小而美，相比于beidou，next.js这样的高度封装方案，我们的实现原理和开发模式一目了然
- 同时支持SSR以及CSR两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- 统一前端路由与服务端路由，无需重复编写路由文件配置
- 支持切换路由时自动获取数据
- 支持本地开发HMR
- 稳定性经过线上大规模应用验证，可提供性能优化方案
- 支持tree shaking以及打包去重依赖，使得打包的bundle非常小，为同样复杂度的next.js项目的0.4倍
- 支持csr/ssr自定义layout，无需通过path来手动区分
- 支持选择某个具体的组件在客户端还是服务端进行渲染
- 配套结合[antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd)的example的实现
- 配套结合[react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable)做路由分割的example的实现
- 配套结合[dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva)做数据管理的example的实现

### 开发中

- 配套[TypeScript](https://github.com/ykfe/egg-react-ssr-typescript)版本的实现
- 配套serverless版本的实现

## 与其他社区方案的对比

相较于目前市面上的其他实现方案，我们有诸多优点, 无论是本地开发还是线上发布。

### 与[easy-team](https://github.com/ykfe/egg-react-ssr/wiki/%E4%B8%8Eeasy-team%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88%E7%9A%84%E5%AF%B9%E6%AF%94)方案对比

- 与服务端框架不耦合，easy-team的实现方式与egg框架耦合的太过紧密
- 本地开发读取服务端bundle的方式更加优雅
- 通过config.default.js同时两种渲染模式无缝切换而easy-team需要在构建时指定渲染类型

### 与[next.js](https://github.com/ykfe/egg-react-ssr/wiki/%E4%B8%8Enext.js%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88%E7%9A%84%E5%AF%B9%E6%AF%94)方案对比

- 与服务端框架不耦合，next.js实现与http模块耦合紧密
- 本地开发读取服务端bundle的方式更加优雅
- 体积小，同等复杂度项目大小为为next.js生成文件的0.3倍
- 实现非黑盒，关键配置皆可通过config.default.js来配置
