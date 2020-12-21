# build.io with egg-react-ssr

## 什么是Builder.io

Builder.io是一个通过拖拽代码组件完成快速网站搭建以及发布的一体化搭建平台。

![](https://camo.githubusercontent.com/1c4c3d347cb75df5d8812bb4acdce3ad953acd14ebba687bf3ffc67b24174d98/68747470733a2f2f696d6775722e636f6d2f486a42574962762e676966)

## 基于SSR渲染的可视化快速搭建

![](https://img.alicdn.com/tfs/TB10AE0sfzO3e4jSZFxXXaP_FXa-1612-1010.png)

## 特点
#### 一次部署，N次发布
用户只需在首次使用时完成一次部署，后续发布变更均无需再次部署。
#### 免code
全可视化搭建，无需编码。
#### 极速发布，实时生效。
用户编辑完成页面后，只需点击发布按钮即可一键发布，实时生效。
#### 路由免配置
新建页面无需配置路由，路由配置将根据页面路径自动生成。

### 快速集成至egg-react-ssr

1.安装依赖
```js
npm i @builder.io/react --save
```
2.注入动态组件
```js
import React from 'react'
import './index.less'
import { builder, BuilderComponent } from '@builder.io/react'
import '@builder.io/widgets'
import { buildKey } from '../../../config/config.ssr'
// 初始化builder
builder.init(buildKey)

function Page (props) {
  const { builderPage } = props
  return (
    <div className='normal'>
      {builderPage ? (
        <BuilderComponent model='page' content={builderPage} />
      ) : (
        <span>page not found!</span>
      )}
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
//  服务端根据路径获取page配置
  const { req, res } = ctx
  const [path] = req.url.split('?')
  const page = await builder.get('page', { req, res, userAttributes: { urlPath: path } }).promise()

  return {
    builderPage: page ? { ...page } : null
  }
}
```
3.修改路由路径配置: ```path: '/*',```

### 5分钟快速上手

使用本示例即可5分钟上手使用

1.前往 https://builder.io/signup 注册一个账户  

![](https://img.alicdn.com/tfs/TB1CKqe3QL0gK0jSZFAXXcA9pXa-1302-838.jpg)  
2.注册完毕之后，前往 https://builder.io/account/organization 查看PublicAPIKey,将其复制到项目的config.ssr配置项下的buildKey中。  

![](https://img.alicdn.com/tfs/TB1ZzWp3KL2gK0jSZFmXXc7iXXa-2872-1646.jpg)  

3.添加编辑model，修改地址为本地地址localhost:7001或者部署服务器域名  

<img src="https://i.imgur.com/PRWvNM1.gif">  

4.进入 https://builder.io/content 新建页面，开始你的搭建之旅吧。 

![](https://img.alicdn.com/tfs/TB1ZuCe3Hr1gK0jSZFDXXb9yVXa-2610-1078.jpg)  

5.页面搭建完毕后，点击右上角发布按钮一键发布，即可立即生效。  

![](https://gw.alicdn.com/tfs/TB1999b3UH1gK0jSZSyXXXtlpXa-2928-1186.jpg)  

