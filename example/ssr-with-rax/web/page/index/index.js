import { createElement } from 'rax' // eslint-disable-line
import Div from 'rax-view'
import Text from 'rax-text'
import './index.less'

const Page = (props) => {
  return (
    <Div className='normal'>
      <Div className='welcome' />
      <Div className='list'>
        {
          props.news && props.news.map(item => (
            <Div key={item.title}>
              <Div>文章标题: {item.title}</Div>
              <Div className='toDetail'><Text>点击查看详情</Text></Div>
            </Div>
          ))
        }
      </Div>
    </Div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page
