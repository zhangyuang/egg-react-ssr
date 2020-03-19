import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway'
const path = require('path')
export type DefaultConfig = PowerPartial<EggAppConfig>
interface MyEggAppInfo extends EggAppInfo {
  appDir?: string
}
export default (appInfo: MyEggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570684373953_5206'

  // add your config here
  config.middleware = [

  ]
  config.static = {
    dir: [path.join(appInfo.appDir, '/output'), path.join(appInfo.appDir, '/src/app/public')],
    prefix: '/'
  }
  return config
}
