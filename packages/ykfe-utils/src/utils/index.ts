import { resolve } from 'path'
import { Readable, PassThrough } from 'stream'
import React from 'react'
import { renderToNodeStream, renderToString as reactRenderToString } from 'react-dom/server'
import { Config } from '../interface/config'

const { renderToString } = require('rax-server-renderer')
const resolveDir = (path: string) => resolve(process.cwd(), path)

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}

const reactToStream = (Component: React.FunctionComponent, props: object, config: Config) => {
  if (config.useReactToString) {
    return reactRenderToString(React.createElement(Component, props))
  } else {
    return config.isRax ? renderToString(React.createElement(Component, props)) : renderToNodeStream(React.createElement(Component, props))
  }
}

const getVersion = (str: string) => {
  try {
    const arr = /\d+(\.\d+)+/.exec(str)
    if (arr === null) {
      throw new Error(str)
    }
    return arr[0]
  } catch (error) {
    console.error(`请检查cdn地址是否符合规范${str}`)
  }
}

class ReadableString extends Readable {
  str: string
  sent: boolean

  constructor (str: string) {
    super()
    this.str = str
    this.sent = false
  }

  _read () {
    if (!this.sent) {
      this.push(Buffer.from(this.str))
      this.sent = true
    } else {
      this.push(null)
    }
  }
}

export {
    resolveDir,
    logGreen,
    reactToStream,
    getVersion,
    ReadableString
}
