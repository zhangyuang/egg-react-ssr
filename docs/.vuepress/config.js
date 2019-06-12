module.exports = {
  title: 'Egg + React + SSR',
  locales: {
    '/': {
      lang: 'zh-CN',
      description: 'Egg + React + SSR服务端渲染应用详解',
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
                'getting-started',
                'isomorphism',
                'config',
                'hmr',
                'getInitialProps',
                'hydrate',
                'publish',
                'optimize',
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
