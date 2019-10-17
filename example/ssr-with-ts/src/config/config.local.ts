export const development = {
  watchDirs: [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts'
  ],
  overrideDefault: true
}

export const proxy = {
  host: 'http://127.0.0.1:8000', // 本地开发的时候代理前端打包出来的资源地址
  match: /(\/static)|(\/sockjs-node)|(\/__webpack_dev_server__)|hot-update/
}
