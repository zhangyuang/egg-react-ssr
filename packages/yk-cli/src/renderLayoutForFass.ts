
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Stream } from 'stream'

let config: any

try {
  config = require('../../../config/config.ssr')
} catch (error) {
  //
}

const reactToStream = (Component: React.FunctionComponent, props: object): Stream => {
  return renderToNodeStream(React.createElement(Component, props))
}

const renderLayout = async () => {
  let Layout
  try {
    Layout = require('../../../dist/Layout.server').default
  } catch (error) {
    //
  }
  const props = {
    layoutData: {
      app: {
        config: config
      }
    }
  }

  const stream = reactToStream(Layout, props)
  return stream
}

export default renderLayout
