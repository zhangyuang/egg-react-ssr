import { Config } from './config'
interface Match {
  params: any
}
export interface Context {
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
