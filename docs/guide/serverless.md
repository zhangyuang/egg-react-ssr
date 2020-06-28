# Serverless

我们结合 midway-faas 发布的 Serverless 场景下的[ SSR 框架](https://github.com/ykfe/ssr)已发布上线并应用于多个线上应用。

本框架为 Serverless 场景下的服务端渲染规范的实现，具有以下特点。

- 小：实现方式简洁使用方式优雅，构建生成的 bundle 文件少且小
- 全：支持 SPA/MPA 两种应用类型的开发，SSR/CSR 两种渲染模式无缝切换，支持 HMR，支持定制组件的渲染模式
- 美：基于[Midway-faas](http://github.com/midwayjs/midway-faas/)框架，拥有强大的生态，可以发布到多个不同的 Serverless 平台

## Serverless for Developer

> Serverless 解放了端开发者（不仅仅是 Web 开发者）的生产力，让端开发者可以更快、更好、更灵活地开发各种端上应用，不需要投入太多精力关注于后端服务的实现。”

传统应用开发流程

![](https://img.alicdn.com/tfs/TB1CE7FB5_1gK0jSZFqXXcpaXXa-1402-150.png)

Serverless 应用开发流程

![](https://img.alicdn.com/tfs/TB1hZgHB7T2gK0jSZPcXXcKkpXa-1136-174.png)

使用本框架开发 Serverless SSR 应用开发流程

![](https://img.alicdn.com/tfs/TB1wzqpCkP2gK0jSZPxXXacQpXa-1880-256.jpg)

开发者只需 5 分钟就可以快速的创建并发布一个 SSR 应用上线，相比于传统服务端应用开发，我们将细节在底层统一抹平。前端开发者只需要关注业务逻辑，无需感知服务器的运行状况。成本和心智负担大大降低，只需要申请一个域名即可将应用发布到公网让所有用户可以访问。
