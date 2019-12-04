import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// 维护一个this指针，用于切换页面时切换
let _this = null
// 维护一个指针不变的触发函数
const popState = () => {
  _this && this.getInitialProps  && this.getInitialProps()
}

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
      const props = this.props
      if (window.__USE_SSR__) {
        // 修改this
        // 使用addEventListener来绑定事件，防止和第三方库冲突，并确保在react-router的popstate后执行。
        _this = this
        window.addEventListener('popstate', popState)
      }
      const getProps = !window.__USE_SSR__ || (props.history && props.history.action === 'PUSH')
      if (getProps) {
        this.getInitialProps()
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
