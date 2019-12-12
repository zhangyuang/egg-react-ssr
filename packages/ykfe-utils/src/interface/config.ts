import { Context } from 'midway'
export interface Config {
  baseDir?: string
  type?: string
  serverJs: ServerJs | string
}

interface ServerJs {
  (ctx: Context): React.ReactElement
}
