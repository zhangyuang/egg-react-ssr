import { matchPath } from 'react-router-dom'
import { RouteItem } from './interface/route'

const getComponent = (Routes: RouteItem[], path: string) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find((route: RouteItem) => matchPath(path, route)) || {}
  const activeComponent = activeRoute.Component
  return activeComponent
}

export default getComponent
