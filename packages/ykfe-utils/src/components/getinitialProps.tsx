import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { FC } from '../interface/fc'

let _this: any = null
const popStateFn = () => {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    _this.getInitialProps()
  }
}

interface IState {
  initialProps: any
  extraProps: Object
}

function GetInitialProps (WrappedComponent: FC): React.ComponentClass {
  class GetInitialPropsClass extends Component<RouteComponentProps<{}>, IState> {
    constructor (props: RouteComponentProps) {
      super(props)
      this.state = {
        extraProps: {},
        initialProps: window.__INITIAL_DATA__ && window.__INITIAL_DATA__[location.pathname] // 使用pathname来防止不同页面的初始props冲突
      }
    }

    async componentDidMount () {
      const props = this.props
      if (window.__USE_SSR__) {
        _this = this // 修正_this指向，保证_this指向当前渲染的页面组件
        window.addEventListener('popstate', popStateFn) // history.pushState和history.replaceState方法并不会触发popstate事件。因此需要另外判断当前action是否为push/replace
      }
      const getProps = !window.__USE_SSR__ || props.history && props.history.action === ('PUSH' || 'REPLACE')

      if (getProps) {
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
      return <WrappedComponent {...Object.assign({}, this.props, window.__INITIAL_DATA__, this.state.initialProps, this.state.extraProps)} />
    }
  }
  return withRouter(GetInitialPropsClass)
}

export default GetInitialProps
