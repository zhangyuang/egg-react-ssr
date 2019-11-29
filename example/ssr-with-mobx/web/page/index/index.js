import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { inject, observer } from 'mobx-react'

// function Page (props) {
//   return (
//     <div className='normal'>
//       <div className='welcome' />
//       <ul className='list'>
//         {
//           props.news && props.news.map(item => (
//             <li key={item.id}>
//               <div>文章标题: {item.title}</div>
//               <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }
const mapStateToProps = ({ store }) => ({
  news: store.pageStore.news
})

@inject(mapStateToProps)
@observer
class Page extends React.Component {
  constructor(props) {
    super(props);

  }
  static getInitialProps = async ({ store }) => {
    return store.pageStore.getData()
  }
  render () {
    const props = this.props
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

}
// Page.getInitialProps = async ({ store }) => {
//   return store.pageStore.getData()
// }



// export default inject(mapStateToProps)(observer(Page))
export default Page