
export interface Global extends NodeJS.Global {
  renderToNodeStream: (element: React.ReactElement) => NodeJS.ReadableStream
  isLocal: boolean
  renderToString: (element: React.ReactElement) => string
}
