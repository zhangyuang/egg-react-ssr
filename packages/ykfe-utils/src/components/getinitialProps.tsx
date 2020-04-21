import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { FC } from '../interface/fc'

let _this: any = null
let routerChanged = false

const popStateFn = (e: PopStateEvent) => {
  // historyPop的时候需要调用getInitialProps
  routerChanged = true
  // 使用popStateFn保存函数防止addEventListener重复注册,排除hashchange的情况
  if (!location.hash && _this && _this.getInitialProps) {
    _this.getInitialProps()
  }
}

interface IState {
  extraProps: Object
}

function GetInitialProps (WrappedComponent: FC): React.ComponentClass {
  class GetInitialPropsClass extends Component<RouteComponentProps<{}>, IState> {
    constructor (props: RouteComponentProps) {
      super(props)
      this.state = {
        extraProps: {}
      }
      if (!routerChanged) {
        routerChanged = !window.__USE_SSR__ || (props.history && props.history.action === 'PUSH')
      }
      if (window.__USE_SSR__) {
        _this = this // 修正_this指向，保证_this指向当前渲染的页面组件
        window.addEventListener('popstate', popStateFn)
      }
    }

    async componentDidMount () {
      // csr 或者 history push的时候需要调用getInitialProps
      if ((this.props.history && this.props.history.action !== 'POP' || !window.__USE_SSR__)) {
        await this.getInitialProps()
      }
    }

    async getInitialProps () {
      // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
      const props = this.props
      if (WrappedComponent.preload) {
        // react-loadable 情况
        WrappedComponent = (await WrappedComponent.preload()).default
      }
      const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(props) : {}
      this.setState({
        extraProps
      })
    }

    render () {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      return <WrappedComponent {...Object.assign({}, this.props, routerChanged ? {} : window.__INITIAL_DATA__, this.state.extraProps)} />
    }
  }
  return withRouter(GetInitialPropsClass)
}

export default GetInitialProps
