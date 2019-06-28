import Loadable from './loadable'
import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: require('@/page/index').default
  },
  {
    path: '/news/:id',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "news" */ '@/page/news'),
      loading: function Loading () {
        return <div />
      }
    })
  }
]

export default routes
