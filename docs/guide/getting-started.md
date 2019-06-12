# 学习准备

本文档将会基于我们团队开源的[Egg + React + SSR](https://github.com/ykfe/egg-react-ssr)应用骨架进行讲解, 你可以先将该项目clone到本地，并运行一下，简单熟悉一下目录结构以及文件。

## 下载应用应用

```
$ npm install yk-cli -g
$ ykcli init <Your Project Name>
$ cd <Your Project Name>
$ npm i
$ npm start
$ open http://localhost:7001
```

## 启动脚本

```
$ npm start // 启动监听7001端口，建议使用方式，同时启动服务端渲染 + 客户端水合
$ npm run ssr // 启动监听7001端口，只启动服务端渲染，此时仅服务端直出html，没有与客户端混合的步骤
$ npm run csr // 启动监听8000端口，只启动客户端渲染，相当于传统的cra脚手架开发模式
$ npm run prod // 模拟SSR应用生产环境
$ npm run build // 打包服务端以及客户端资源文件
$ npm run analyze // 可视化分析客户端打包的资源详情
```