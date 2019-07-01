import React from 'react'
import Layout from './layout'
import { connect } from 'react-redux'
import './index.less'

function Page(props) {
  // dataFromRedux 是从 mapstatetoprops 中合并来的数据
  const { dataFromRedux } = props

  return <div className='news-container'>
    文章详情: {props.dataFromRedux && props.dataFromRedux.body}
  </div>
}

// 自定义Layout
Page.Layout = Layout

Page.getInitialProps = async (ctx) => {
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  await ctx.store.dispatch({ type: 'news/loadOne', payload: { id: newsId } })
}

export default connect((state, ownProps) => {
  const { news } = state
  return { dataFromRedux: news.detail }
})(Page)
