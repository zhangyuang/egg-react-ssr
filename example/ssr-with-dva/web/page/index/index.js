import React from 'react'
import { connect } from 'react-redux'
import './index.less'
import { Link } from '@/utils/Link'

// 模拟当前页码
let currentPage = 1

function Page(props) {
  // dataFromRedux 是从 mapstatetoprops 中合并来的数据
  const { dataFromRedux, store } = props

  // 请求下一页
  const loadMoreHandler = async (page) => {
    await props.store.dispatch({ type: 'news/load', payload: { page: page } })
  }

  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.dataFromRedux && props.dataFromRedux.map((item, index) => (
            <li key={`news${index}`}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
      <div onClick={() => { loadMoreHandler(++currentPage) }}>加载更多</div>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  await ctx.store.dispatch({ type: 'news/load', payload: { page: currentPage } })
}

export default connect((state, ownProps) => {
  const { news } = state
  return { dataFromRedux: news.data }
})(Page)

