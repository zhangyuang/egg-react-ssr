# FAQ

## 如何解决服务端访问不可访问的对象的问题

SSR是近几年才火热的话题，如果是新的项目且开发人员对SSR有较深的认知，那么在设计应用的过程中就会有意识的去避免在服务端访问客户端对象的情况。但在老项目或者老的第三方库/框架，或者是开发人员对SSR理解不深刻的情况下，会出现很多类似 `window is not defined` 的错误。  
先说前言，个人是不推荐用 `jsdom` 来在服务端模拟客户端环境，这样最多只能模拟最外层的对象例如 `window document` 但如果要访问更深层次的对象例如 `document.getElementById` 则还是会报错。且这种方式新增了一堆很dirty的代码且不利于debug容易造成未知的问题。  
自己的代码我们可以控制，那么如果有第三方模块犯了这种问题应该如何解决呢。在有能力给第三方模块提PR的时候还是建议以PR的形式进行修复。例如 `axios` 就会根据你当前的环境来决定到底是用xhr对象还是用http模块来发起请求。如果没办法改动第三方模块，我们可以在代码中延迟加载这些模块，让它在客户端执行的时候被调用。  

1. 使用本应用提供的 `__isBrowser__` 常量来判断，例如引入jquery可以使用以下引入方式
   
```js
import $ from 'jquery' // error
const $ = __isBrowser__ ? require('jquery') : {} // true
```

2. 在 `didMount` 生命周期加载模块

```js
class Page {
    this.state = {
        $: {}
    }
    componentDidMount () {
        this.setState({
            $: require('jquery')
        })
    }
}
```

3. 如果某个组件调用的库一定要使用浏览器对象才能得到结果，那么只能将该组件放到客户端进行render了，参考[OnlyCsr](./faq.md#如何让某一个组件只在客户端进行渲染)

<span style="color: red">注: 不要想着在服务端去访问客户端对象，这意味着你 or 开发第三方模块的人对React SSR的理解不够, 虽然这一开始会导致一定的错误，但对于你去理解SSR的执行机制以及分清楚Server/Client两端的区别帮助很大</span>

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

```js
import { OnlyCsr } from 'ykfe-utils'

export default OnlyCsr(Page)
```

## 刷新8000端口为什么会导致404

8000端口启动的是CSR(客户端渲染)应用，并且此时我们使用的是history路由模式，这里我们首先要明白前端路由和后端路由有什么区别

- 前端路由，一般分为hash路由和history路由两种模式，分别是使用url hash值和html5 history api来实现前端修改url地址来局部更新页面
- 后端路由，是当前应用真实存在的访问路径，在请求到来时根据path去匹配对应的路由来做一些应用操作

形如`http://localhost:8000/user/:id`这种路由，在没有后端路由支持的情况下，服务端并不存在与之对应的资源，刷新后相当于去服务器访问该资源自然会404。
解决方式请查看: [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
