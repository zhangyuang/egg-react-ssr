import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

let _this = null
const popStateFn = () => {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    _this.getInitialProps()
  }
}

interface IProps {
  history: {
    action: string
  }
}
interface IState {
  getProps: boolean,
  extraProps: Object
}
function GetInitialProps (WrappedComponent) {
  class GetInitialPropsClass extends Component<IProps, IState> {
    constructor (props) {
      super(props)
      this.state = {
        extraProps: {},
        getProps: false
      }
    }

    async componentDidMount () {
      const props = this.props
      if (window.__USE_SSR__) {
        _this = this // 修正_this指向，保证_this指向当前渲染的页面组件
        window.addEventListener('popstate', popStateFn)
      }
      const getProps = !window.__USE_SSR__ || (props.history && props.history.action === 'PUSH')
      if (getProps) {
        await this.getInitialProps()
      }
    }

    async getInitialProps () {
      // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
      const props = this.props
      const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(props) : {}
      this.setState({
        extraProps,
        getProps: true
      })
    }

    render () {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      return <WrappedComponent {...Object.assign({}, this.props, this.state.getProps ? {} : window.__INITIAL_DATA__, this.state.extraProps)} />
    }
  }
  return withRouter(GetInitialPropsClass)
}

export default GetInitialProps
