import React from 'react'

import { Link as RrdLink } from 'react-router-dom'

const HashLink = (props) => {
  const to = '#' + props.to
  return <RrdLink {...props} to={to}>{props.children}</RrdLink>
}


const Link = (props) => {
  if (__isBrowser__ && !window.__USE_SSR__) {
    return <HashLink {...props} />
  }
  return <RrdLink {...props} />
}

export default Link

export { Link }
