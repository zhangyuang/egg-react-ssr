import { Context } from 'midway'

export interface Global extends NodeJS.Global {
  renderToNodeStream: RenderToNodeStream | object
  serverStream: (ctx: Context) => Promise<React.ReactElement>
  isLocal: boolean
}

interface RenderToNodeStream {
  [key: string]: (element: React.ReactElement) => NodeJS.ReadableStream
}
