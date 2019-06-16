import { Startup } from '../../decorator/Startup';
import { AppRoute } from '../../../config/config.default';
import { Context } from 'egg';
import { Link } from 'react-router-dom'
import { Route } from '@/decorator/Route';
import React from 'react';
import styles from './index.module.scss';
import '@/page/news/index';

/**
 * 当前页面组件
 * 属性类型
 * @interface IPageProps
 */
interface IPageProps {
  news: any[];
}


/**
 * 实例首页
 *
 * @export
 * @class Page
 * @extends {React.Component<IPageProps>}
 */
@Startup()
@Route(AppRoute.index)
export default class Page extends React.Component<IPageProps> {

  /**
   * 页面初始化取数据方法
   *
   * @static
   * @param {Context} _ctx 服务端egg 上下文
   * @returns {Promise<any>}
   * @memberof Page
   */
  static async getInitialProps(_ctx: Context): Promise<any> {
    return Promise.resolve({
      news: [
        {
          id: '1',
          title: 'Racket v7.3 Release Notes'
        },
        {
          id: '2',
          title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
        },
        {
          id: '3',
          title: 'Voynich Manuscript Decoded by Bristol Academic'
        },
        {
          id: '4',
          title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
        },
        {
          id: '5',
          title: 'How much do YouTube celebrities charge to advertise your product? '
        }
      ]
    })
  }

  constructor(props: IPageProps) {
    super(props);
  }

  componentDidMount(): void {

  }

  render(): JSX.Element {
    return (
      <div className="normal">
        <ul className={styles.list}>
          {
            this.props.news && this.props.news.map((item, index) => (
              <li key={`news${index}`}>
                <div>文章标题: {item.title}</div>
                <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}







