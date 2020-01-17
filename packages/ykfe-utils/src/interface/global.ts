import { Context } from 'midway'

export interface Global extends NodeJS.Global {
  renderToNodeStream: (element: React.ReactElement) => NodeJS.ReadableStream
  serverStream: ServerStream
  isLocal: boolean
}

interface ServerStream {
  [key: string]: (ctx: Context) => Promise<React.ReactElement>
}
