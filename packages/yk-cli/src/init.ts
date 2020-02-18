import ora from 'ora'
import { getConfig } from './config'
import { checkRepeat } from './check'
import { cacheMange } from './cache'
import { updateCli } from './update'
import { Optional } from './interface/option'

const spinner = ora('应用初始化中')

const init = async (option: Optional) => {
  // 自检更新当前脚手架是否最新
  await updateCli()
  // 问询APP配置
  await getConfig(option)
  // 判断当前appName是否已存在
  await checkRepeat(option)
  // 显示loading
  spinner.start()
  // 缓存比对
  await cacheMange(option)

  spinner.succeed()
  process.exit()
}

export default init
