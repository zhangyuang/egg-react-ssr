import { Context } from 'midway'
export interface Config {
  baseDir?: string
  type?: string
  serverJs: (ctx: Context) => React.ReactElement | string
}
