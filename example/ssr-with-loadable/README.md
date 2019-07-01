# Egg + React + SSR应用骨架

详细用法实现请查看[官方文档](http://ykfe.net)

# Getting Start

这里我们提供了一个脚手架来方便你创建项目

```
$ npm install yk-cli -g
$ ykcli init <Your Project Name>
$ cd <Your Project Name>
$ npm i
$ npm start
$ open http://localhost:7001
```

# 功能/特性

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



