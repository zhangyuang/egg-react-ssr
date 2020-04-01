import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { FC } from '../interface/fc'

let routerChanged = false
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
        // csr渲染模式下无论是首次打开页面还是路由跳转都需要客户端需要调用getInitialProps
        // 进行过history push或者reaplace操作之后，每次进行单页跳转客户端都需要调用getInitialProps
        routerChanged = !window.__USE_SSR__ || props.history && props.history.action !== 'POP'
      }
    }

    async componentDidMount () {
      if (routerChanged) {
        await this.getInitialProps()
      }
    }

    async getInitialProps () {
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
