import { pathToRegexp } from 'path-to-regexp'
import cloneDeepWith from 'lodash.clonedeepwith'
import { Config } from './interface/config'
import { RouteItem } from './interface/route'

const preloadComponent = async (Routes: RouteItem[], config?: Config) => {
  const baseName = config && config.baseName
  const pathName = baseName ? location.pathname.replace(baseName, '') : location.pathname
  const _Routes = cloneDeepWith(Routes)
  for (let i in _Routes) {
    const { Component, path } = _Routes[i]
    let activeComponent = Component()
    if (activeComponent.preload && pathToRegexp(path).test(pathName)) {
      activeComponent = (await activeComponent.preload()).default
    }
    _Routes[i].Component = () => activeComponent
  }
  return _Routes
}

export {
  preloadComponent
}
