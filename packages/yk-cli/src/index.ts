#!/usr/bin/env node

import { Optional } from './interface/option'
import { appconfig } from './config'
import { init_app } from './app'
import { packagejson } from './package'
import { webpack } from './webpackconfig'
import { help } from './help'
import { cacheMange } from './cache'
import { component } from './webcomponent'
import { updatelocal } from './update'

/** 总会话函数 */
const generator = (argv: string[]): void => {
    /** 所有命令参数 */
  let optionlist = argv
  let option: Optional = {}
  option.action = optionlist[0]
  option.command = optionlist.slice(1)

  const session = async () => {
    let action = option.action
    try {
      switch (action) {
                /** 构建项目 */
        case 'init':
                    /** 自检更新当前脚手架是否最新 */
          await updatelocal(option)
                    /** 问询APP配置 */
          await appconfig(option)
                    /** 构建应用 */
          await init_app(option)
                    /** 缓存比对 */
          await cacheMange(option)
                    /** 处理 package.json */
          await packagejson(option)
                    /** 处理 webpack */
          await webpack(option)
                    /** 处理 组件 */
          if ((option.language === 'javascript' && option.style !== 'less') || (option.language === 'typescript' && option.style !== 'sass')) {
            await component(option)
          }
          console.log(`项目安装成功!`)
          break
                /** 项目帮助 */
        case 'help':
          await help()
          break
      }
    } catch (ex) { }
  }

  session()
}

generator(process.argv.slice(2))
