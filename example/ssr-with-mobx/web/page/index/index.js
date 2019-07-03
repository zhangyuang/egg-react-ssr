import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { inject, observer } from 'mobx-react'

function Page (props) {
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.news && props.news.map((item, index) => (
            <li key={`news${index}`}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Page.getInitialProps = async ({ store }) => {
  await store.pageStore.getData()
}

const mapStateToProps = ({ store }) => ({
  news: store.pageStore.news
})

export default inject(mapStateToProps)(observer(Page))
