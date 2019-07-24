# FAQ

## 开发过程中报content not match的错误如何解决

这种问题原因是你在服务端与客户端渲染了不同的DOM结果。这里我们分两种情况  
1. 你的代码写的有问题导致了出现服务端与客户端渲染结果不一致的差异，这种情况找到问题并解决就行了  
2. 你确实没办法保证服务端的结果与客户端渲染的结果一致，比如客户端渲染结果调用了document对象或者location对象，服务端无法获取。

这里我们讲一下情况2要怎么解决。举个例子，这里我们需要获取到location.href,这里我们虽然也能通过ctx.req.url来获取，但是如果是某个属性无法获取的情况要怎么处理呢

```js
<div>{location.href}</div>
```

```js
class Page {
    constructor () {
        this.state = {
            text: 'Error Content'
        }
    }

    componentDidMount () {
        this.setState({
            text: location.href
        })
    }

    render () {
        return (
            <div>{this.state.text}</div>
        )
    }
}
```

解决方式: 通过读取state的方式，在didmount中更新state，来触发组件的重新render，缺点是会让客户端再调用一次render方法

## 如何让某一个组件只在客户端进行渲染

使用ykfe-utils提供的高阶组件OnlyCsr

```
import { OnlyCsr } from 'ykfe-utils'

export default OnlyCsr(Page)
```

## 刷新8000端口为什么会导致404

8000端口启动的是CSR(客户端渲染)应用，并且此时我们使用的是history路由模式，这里我们首先要明白前端路由和后端路由有什么区别

- 前端路由，一般分为hash路由和history路由两种模式，分别是使用url hash值和html5 history api来实现前端修改url地址来局部更新页面
- 后端路由，是当前应用真实存在的访问路径，在请求到来时根据path去匹配对应的路由来做一些应用操作

形如`http://localhost:8000/user/:id`这种路由，在没有后端路由支持的情况下，服务端并不存在与之对应的资源，刷新后相当于去服务器访问该资源自然会404。
解决方式请查看: [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
