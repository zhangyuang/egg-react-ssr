export interface Config {
  baseDir?: string
  type?: string
    serverJs: string | (ctx: Context) => React.ReactElement
}
