
import React from 'react'
import '@/assets/common.less'
import './index.less'
import { Link } from 'react-router-dom'

const Layout = (props) => {
  const isDev = process.NODE_ENV === 'development'
  if (isDev && props.layoutData.render) {
    if (__isBrowser__) {
      return <div id='app' ><div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div></div>
    } else {
      const { injectCss, injectScript, chunkName } = props.layoutData.app.config
      return (
        <html lang='en'>
          <head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
            <meta name='theme-color' content='#000000' />
            <title>React App</title>
            {
              injectCss && injectCss(chunkName).map(item => <link rel='stylesheet' href={item} />)
            }
          </head>
          <body>
            <div id='app' ><div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div></div>
            <div dangerouslySetInnerHTML={{
              __html: injectScript && injectScript(chunkName).join('')
            }} />
          </body>
        </html>
      )
    }
  }
}

export default Layout
