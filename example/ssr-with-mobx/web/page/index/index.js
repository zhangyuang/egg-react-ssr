import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { observer } from 'mobx-react'
import { useStore } from '../../entry'

function Page (props) {
  const store = useStore()
  useEffect(() => {
    store.pageStore.getData()
  }, 0)
  console.log('store', store)
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          store.pageStore.news && store.pageStore.news.map(item => (
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

// Page.getInitialProps = async ({ store }) => {
//   return store.pageStore.getData()
// }

export default observer(Page)
