import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const __isBrowser__ = typeof document !== 'undefined'
const isDev = process.env.NODE_ENV === 'development'
const PERFORMANCE = true || process.env.PERFORMANCE
const USE_PERFORMANCE = PERFORMANCE && isDev
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
      if (USE_PERFORMANCE) {
        const str = document.querySelector('#performanceSSR').innerHTML
        console.log('客户端渲染该组件出现的时间')
        eval(str) // eslint-disable-line
      }
      const props = this.props
      if (window.__USESSR__) {
        window.onpopstate = () => {
          this.getInitialProps()
        }
      }
      const getProps = !window.__USESSR__ || (props.history && props.history.action === 'PUSH')
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

    createPerformanceContainer (WrappedComponent, props) {
      return (
        <div>
          {
            USE_PERFORMANCE && <div dangerouslySetInnerHTML={{
              __html: `<script>console.log("服务端渲染该组件在屏幕中出现的时间")</script>
              <script id="performanceSSR">console.log(performance.now())</script>`
            }} />
          }
          <WrappedComponent {...props} />
        </div>
      )
    }

    render () {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      const csrProps = __isBrowser__ && Object.assign({}, this.props, this.state.getProps ? {} : window.__INITIAL_DATA__, this.state.extraProps)
      return this.createPerformanceContainer(WrappedComponent, __isBrowser__ ? csrProps : this.props)
    }
  }

  return __isBrowser__ ? withRouter(GetInitialPropsClass) : GetInitialPropsClass
}

export default GetInitialProps
