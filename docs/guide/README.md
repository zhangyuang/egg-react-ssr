# 介绍

## 初衷

由于React官方缺少完整的SSR(Server-Side Rendering)文档，只是简单的介绍了一下需要用到的API, 同时网络上的文章也良莠不齐，大都是十分简略的实现方式，无法适用于大规模的线上应用。本文档会详细介绍一个完整的Egg + React + SSR应用的开发流程, 我们力求该应用的实现方式比目前市面上任何框架的实现方式都要简单，同时做到做到本文档详细程度超过目前市面上的任何一篇文章，不但教你如何做，还会教你为什么要这样做。

本文档假设你已经熟悉React本身，并且具有 Node.js 和 webpack 的一定使用经验。即使不多也没关系，我们尽量以通俗易懂的方式来将这些代码解释的很详细。如果你倾向于使用提供了平滑开箱即用体验的更高层次解决方案，你应该去尝试使用[umi.js](https://umijs.org/zh/)。它是企业级 react 应用框架，支持约定式路由，开箱即用。但是，如果你需要更直接地控制应用程序的结构，umi.js 并不适合这种使用场景。无论如何，阅读本文档将更有助于更好地了解一切如何运行。

最后，请注意，本文档中的解决方案不是限定的,但是经过多次优化我们发现它们对我们来说很好，但这并不意味着无法继续改进。可能会在未来持续改进，欢迎提交 [pull request](https://github.com/ykfe/egg-react-ssr/pulls) 作出贡献！

## 技术栈

[Egg](https://eggjs.org/zh-cn/intro/index.html)企业级Node.js框架

[React](https://react.docschina.org/)用于构建用户界面的 JavaScript 库

[SSR](https://reactjs.org/docs/react-dom-server.html)服务端渲染

## 与其他社区方案的对比

与[easy-team](https://github.com/ykfe/egg-react-ssr/wiki/%E4%B8%8Eeasy-team%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88%E7%9A%84%E5%AF%B9%E6%AF%94)方案对比

与[next.js](https://github.com/ykfe/egg-react-ssr/wiki/%E4%B8%8Enext.js%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88%E7%9A%84%E5%AF%B9%E6%AF%94)方案对比
