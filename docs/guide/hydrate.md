# 客户端混合

## 执行流程

相较于传统的前后端异构的服务端渲染模式，在服务端直出html后，前端只需要用js找到DOM节点绑定事件后，一个基本的应用便开发完成了。但如果使用React/Vue这种基于vdom的框架，我们没办法通过这种方式来绑定事件，这里我们必须借助官方的API来做这件事。这里我们用到了ReactDOM.hydrate这个API传统的CSR应用都是调用ReactDOM.render。下面我们来介绍一下客户端需要做哪些事情，以及这个API到底干了什么。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import defaultLayout from '@/layout'
import { GetinitialProps, getComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.default'

const clientRender = async () => {
  // 客户端渲染|水合
  ReactDOM[window.__USESSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用HOC使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        Routes.map(({ path, exact, Component }, key) => {
          const ActiveComponent = Component()
          const Layout = ActiveComponent.Layout || defaultLayout
          return <Route exact={exact} key={key} path={path} render={() => {
            const HOC = GetinitialProps(ActiveComponent)
            return <Layout><HOC /></Layout>
          }} />
        })
      }
    </BrowserRouter>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}
```

1、首先我们判断了当前页面是否使用了服务端渲染，使用window.__USESSR__属性来判断，使用了SSR的应用会在服务端吐出来的html中注入这个属性。根据不同的结果判断使用render方法还是hydrate的方法来处理我们的组件，此处是为了兼容ssr/csr两种渲染模式。  

2、接着我们使用了BrowserRouter来包裹客户端渲染的组件，此处是为了能够使用前端路由跳转来切换页面。  

3、接着我们遍历了config配置中的路由表, 首先我们调用Component方法来获取到真实的class组件, 然后与服务端一致，判断组件有没有自己特殊的layout需求，如果有就用组件自己的layout不用默认的  

4、这里我们用react-router的route组件来渲染我们自己的组件  

5、这里我们写了一个GetinitialProps的高阶组件，用来隐藏此处的细节，为了使csr/ssr的使用方式和表现形式一致，现在我们来看看GetinitialProps这个HOC到底干了什么

## HOC组件机制

```js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

function GetInitialProps (WrappedComponent) {
  class GetInitialPropsClass extends Component {
    constructor (props) {
      super(props)
      this.state = {
        extraProps: {},
        getProps: false
      }
    }
    componentDidMount () {
        // 这里的props是withRouter这个高阶组件传递的props，主要包含一些路由信息比如match, params
      const props = this.props
      if (window.__USESSR__) {
          // 如果当前是SSR应用，当前端路由回退时调用getInitialProps方法，之所以要这么做，是因为首次进入页面props.history.action的值就是POP，所以没办法通过值为POP来判断当前是不是回退操作
          // 得借助于window.onpopstate方法
        window.onpopstate = () => {
          this.getInitialProps()
        }
      }
      // !window.__USESSR__代表如果是CSR应用，每次didMount时都会调用getInitialProps方法，|| 后面的语句意思是，当前是SSR应用，当路由进行PUSH操作时调用getInitialProps方法
      const getProps = !window.__USESSR__ || (props.history && props.history.action === 'PUSH')
      if (getProps) {
        this.getInitialProps()
      }
    }

    async getInitialProps () {
      const props = this.props
      const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(props) : {}
      this.setState({
        extraProps,
        getProps: true
      })
    }
    render () {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      return <WrappedComponent {...Object.assign({}, this.state.getProps ? {} : window.__INITIAL_DATA__, this.state.extraProps)} />
    }
  }
  return withRouter(GetInitialPropsClass)
}

export default GetInitialProps
```

总结一下GetInitialProps做的事情，为了保证SSR／CSR应用每次进行前端路由切换时都会调用getInitialProps方法，并将获取的数据作为props注入到要渲染的组件。且CSR应用首次进入页面时也会调用getInitialProps方法，SSR应用之所以不需要调用，是因为这块数据获取的操作我们已经在服务端完成了，这时候只要把服务端注入到window.__INITIAL_DATA__的数据作为组件的props传入即可。

6、最后我们用layout将HOC组件包裹，进行hydrate或者render

## hydrate API揭秘

在揭秘hydrate之前，我们需要知道React的onClick绑定事件和用addEventListener的方式绑定事件有什么区别。
> React并不是将click事件绑在该div的真实DOM上，而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装并交由真正的处理函数运行。
以上面的代码为例，整个事件生命周期示意如下：

![](https://user-gold-cdn.xitu.io/2017/10/9/8792eeae6dc6011274986acf42a76b15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这里我们贴出核心代码
```js
// react-dom/src/client/ReactDOM.js
hydrate(element: React$Node, container: DOMContainer, callback: ?Function) {
    // 这里我们调用了legacyRenderSubtreeIntoContainer方法，与ReactDOM.render方法不同的地方是第四个参数我们这时候为true
    return legacyRenderSubtreeIntoContainer(
        null,
        element,
        container,
        true,
        callback,
    );
}

```