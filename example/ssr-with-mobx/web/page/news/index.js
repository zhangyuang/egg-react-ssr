import React from 'react'
import Layout from './layout'
import './index.less'
import { inject, observer } from 'mobx-react'

function News (props) {
  return (
    <div className='news-container' >
      文章详情: {props.detail}
    </div>
  )
}

// 自定义Layout
News.Layout = Layout

News.getInitialProps = async (ctx) => {
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  await ctx.store.newsStore.getData(newsId)
}

const mapStateToProps = ({ store }) => ({
  detail: store.newsStore.detail
})

export default inject(mapStateToProps)(observer(News))
