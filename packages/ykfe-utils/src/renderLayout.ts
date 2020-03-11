
import { Context }from 'midway'
import { useCdn } from './useCdn'
import { reactToStream, getVersion } from './utils'
import { Config } from './interface/config'

const renderLayout = async (ctx: Context, config: Config) => {
  const { useCDN, layout } = config
  const isLocal = process.env.NODE_ENV === 'development' || config.env === 'local' // 标志非正式环境
  const props = {
    layoutData: ctx,
    ctx
  }
  let LAYOUT_PATH = layout

  if (useCDN && typeof layout === 'string') {
    const version = getVersion(layout)
    const filename = `layout${version}`
    LAYOUT_PATH = await useCdn(layout, isLocal, filename)
  }

  if (isLocal && typeof LAYOUT_PATH === 'string') {
    delete require.cache[LAYOUT_PATH]
  }

  const Layout = typeof LAYOUT_PATH === 'string' ? require(LAYOUT_PATH).default : LAYOUT_PATH

  const stream = reactToStream(Layout, props, config)
  return stream
}

export {
  renderLayout
}
