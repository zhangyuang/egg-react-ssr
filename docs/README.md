---
home: true
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 小
  details: 构建出来的bundle为同等复杂度的next.js项目的0.4倍
- title: 全
  details: 同时支持CSR/SSR两种渲染模式无缝切换
- title: 美
  details: 一切关键位置皆可通过config.default.js来配置
footer: MIT Licensed | Copyright © 2017-present
---

## Getting started

```bash
$ npm install yk-cli -g
$ ykcli init <Your Project Name>
$ cd <Your Project Name>
$ npm i
$ npm start
$ open http://localhost:7001
```

## 用法

- render是react的视图渲染方法
- getInitialProps是获取数据方法，将返回值赋值给组件状态
    - csr通过高阶组件实现
    - ssr通过node执行

```js
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

## 社区交流

| Pull Request                                                | Github Issue                                            | 钉钉群                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [egg-react-ssr/pulls](https://github.com/ykfe/egg-react-ssr/pulls) | [egg-react-ssr/issues](https://github.com/ykfe/egg-react-ssr/issues) | <img src="https://img.alicdn.com/tfs/TB15zfha79E3KVjSZFGXXc19XXa-750-990.jpg" width="60" /> |
