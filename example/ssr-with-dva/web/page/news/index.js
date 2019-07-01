import React from 'react'
import Layout from './layout'
import { connect } from 'dva'
import './index.less'

function News (props) {
  return <div className='news-container'>
    文章详情: {props.detail}
  </div>
}

// 自定义Layout
News.Layout = Layout

News.getInitialProps = async (ctx) => {
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  await ctx.store.dispatch({ type: 'news/getData', payload: { id: newsId } })
}

const mapStateToProps = (state) => ({
  detail: state.news.detail
})

export default connect(mapStateToProps)(News)
