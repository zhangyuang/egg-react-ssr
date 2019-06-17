# FAQ

## 开发过程中报content not match的错误如何解决

这种问题原因是你在服务端与客户端渲染了不同的DOM结果。这里我们分两种情况  
1、你的代码写的有问题导致了出现服务端与客户端渲染结果不一致的差异，这种情况找到问题并解决就行了  
2、你确实没办法保证服务端的结果与客户端渲染的结果一致，比如客户端渲染结果调用了document对象或者location对象，服务端无法获取。

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


