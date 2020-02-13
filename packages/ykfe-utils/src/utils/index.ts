import { resolve } from 'path'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'

const resolveDir = (path: string) => resolve(process.cwd(), path)

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}

const reactToStream = (Component: React.FunctionComponent, props: object) => {
  return renderToNodeStream(React.createElement(Component, props))
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

export {
    resolveDir,
    logGreen,
    reactToStream,
    getVersion

}
