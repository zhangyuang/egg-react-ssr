module.exports = {
  title: 'Egg + React + SSR',
  locales: {
    '/': {
      lang: 'zh-CN',
      description: '最小而美的服务端渲染应用骨架',
    },
    '/en/': {
       // 英文版，待补充
       lang: 'en-US'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        nav: [
          { text: '指南', link: '/guide/' },
          { text: '配置', link: '/config/' },
          { text: 'Github', link: 'https://github.com/ykfe/egg-react-ssr' },
        ],
        selectText: '选择语言',
        label: '简体中文',
        sidebar: {
          '/guide/': [
            {
              collapsable: false,
              children: [
                '',
                'gettingStarted',
                'isomorphism',
                'config',
                'getInitialProps',
                'hydrate',
                'stream',
                'hmr',
                'optimize',
                'publish',
                'ts',
                'serverless',
                'faq'
              ],
            },
          ]
        }
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English(待补充)'
      }
    }
  }
}
