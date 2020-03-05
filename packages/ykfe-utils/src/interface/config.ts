import { Context } from 'midway'
import { RouteItem } from './route'
export interface Config {
  baseDir?: string
  type?: string
  serverJs: ServerJs | string,
  layout: ServerJs | string
  env?: string
  useCDN?: string
  isRax?: boolean
  useReactToString?: boolean
  routes: RouteItem[]
  injectScript: string[]
  injectCss: string[]
}

export interface ServerJs {
  (ctx: Context): Promise<React.ReactElement>
}
