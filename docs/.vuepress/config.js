module.exports = {
  title: 'Egg + React + SSR',
  head: [
    ['link', { rel: 'icon', href: 'https://avatars1.githubusercontent.com/u/50347314?s=200&v=4' }],
    ['script', {}, `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ad212e8d41079dc41abaeda9b36e2501";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })()`]
  ],
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
