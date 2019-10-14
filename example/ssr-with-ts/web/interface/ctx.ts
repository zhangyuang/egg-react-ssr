import { Config } from './config'
import { Context } from 'midway'
import { withRouter } from 'react-router'
interface Match {
  params: any
}
export interface Ctx {
  path: string,
  serverData?: object,
  req: Req,
  type: string,
  config: Config,
  match: Match,
  params?: any
}

export interface Req {
  url: string
}
