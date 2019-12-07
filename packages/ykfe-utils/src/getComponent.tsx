import React from 'react'
import { matchPath } from 'react-router-dom'

interface RouteItem {
  path: string
  exact?: boolean
  Component: Component
}
interface Component {
  (): () => Element
}

function NotFound () {
  return (
    <div>路由查询404</div>
  )
}
const getComponent = (Routes: RouteItem[], path: string) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find(route => matchPath<RouteItem>(path, route)) || { 'Component': () => <NotFound></NotFound> } // 找不到对应的组件时返回NotFound组件
  const activeComponent = activeRoute.Component
  return activeComponent
}

export default getComponent
