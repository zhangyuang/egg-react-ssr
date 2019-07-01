import React from 'react'
import Layout from './layout'
import { connect } from 'react-redux'

import './index.less'

/*
// @important:
现在问题就是
当
*/
function Page(props) {
  console.log('🦊[3] render:')
  console.log('--[3] props', props)
  const { detailDataFromGetInitialProps, dataFromRedux888888888, news } = props

  return <div className='news-container'>
    文章详情: {props.dataFromRedux888888888 && props.dataFromRedux888888888.body}
  </div>
}

// 自定义Layout
Page.Layout = Layout

// @note:
Page.getInitialProps = async (ctx) => {
  console.log('🦊[1] getInitialProps:')
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  const { data } = await ctx.store.dispatch({ type: 'news/loadOne', payload: { id: newsId } })
  return {
    detailDataFromGetInitialProps: data,
    bbbbbbbbbbbbb: 999999999999999999999
  }
}

// export default Page

export default connect((state, ownProps) => {
  console.log('🦊[2] connect:')
  // console.log('[2] ownProps:', ownProps);
  // const newsId = __isBrowser__ ? ownProps.match.params.id : ownProps.params.id
  const { news } = state
  console.log(news);

  // const id = ownProps.params
  // @important: 在model 中加了个 字段  showId 来显示当前 显示的 详情页id.
  const detail = news.data.filter(v => v.id === news.showId)[0]
  // // @note:
  return { dataFromRedux888888888: detail }
})(Page)
