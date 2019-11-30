import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './index.less'

function Page (props) {
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.news && props.news.map(item => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ store }) => ({
  news: store.pageStore.news
})

Page.getInitialProps = async ({ store }) => {
  return store.pageStore.getData()
}

export default inject(mapStateToProps)(observer(Page))
