import { EggPlugin } from 'midway'
export default {
  static: true, // default is true
  proxy: {
    package: 'egg-proxy',
    enable: true
  }
} as EggPlugin
