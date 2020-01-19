import { Context } from 'midway'

export interface Global extends NodeJS.Global {
  renderToNodeStream: (element: React.ReactElement) => NodeJS.ReadableStream
  isLocal: boolean
}
