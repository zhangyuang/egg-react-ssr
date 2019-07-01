import React from 'react'
import { connect } from 'react-redux'
import './index.less'
import { Link } from '@/utils/Link'

let page = 1

function Page(props) {
  console.log('🦊[3] render:')
  console.log('[3] props:', props);

  const { newsDataFromInitialProps, dataFromRedux888888888, news, store } = props

  const loadMore = async (page) => {
    const { data } = await props.store.dispatch({ type: 'news/load', payload: { page: page } })
  }

  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.dataFromRedux888888888 && props.dataFromRedux888888888.map((item, index) => (
            <li key={`news${index}`}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
      <div onClick={() => { loadMore(++page) }}>加载更多</div>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  console.log('🦊[1] getInitialProps:')
  await ctx.store.dispatch({ type: 'news/load', payload: { page: page } })
  // const { data } = await ctx.store.dispatch({ type: 'news/load', payload: { page: page } })
  // const { news } = ctx.store.getState()
  return {
    aaaaaaaaaaaaaaaaaaaaaaaaaaaa: 6666666666666666666666
    // newsDataFromInitialProps: news,
    // store: ctx.store,
    // ctx: ctx
  }
}

// @important: don't forget export

export default connect((state, ownProps) => {
  console.log('🦊[2] connect:')
  const { news } = state
  console.log('[2] ownProps:', ownProps);

  // @note:
  return { dataFromRedux888888888: news.data }
})(Page)

