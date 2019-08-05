
import React from 'react'
import '@/assets/common.less'
import './index.less'
import { Link } from 'react-router-dom'
import serialize from 'serialize-javascript'

const commonNode = props => (
  <div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div>
)

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { injectCss, injectScript, chunkName, type } = props.layoutData.app.config
    const renderCsr = (__renderCsrTpl__ || type !== 'ssr')
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <title>React App</title>
          {
            injectCss && injectCss(chunkName).map(item => <link rel='stylesheet' href={item} key={item} />)
          }
        </head>
        <body>
          <div id='app'>{ renderCsr ? '' : commonNode(props)}</div>
          {
            renderCsr ? '' : <script dangerouslySetInnerHTML={{
              __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(props.layoutData.serverData || {})}`
            }} />
          }
          <div dangerouslySetInnerHTML={{
            __html: injectScript && injectScript(chunkName).join('')
          }} />
        </body>
      </html>
    )
  }
}

export default Layout
