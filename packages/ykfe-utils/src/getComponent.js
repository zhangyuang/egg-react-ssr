import { matchPath } from 'react-router-dom'

const getComponent = (Routes, path) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find(route => matchPath(path, route)) || {}
  const activeComponent = activeRoute.Component
  return activeComponent
}

export default getComponent
