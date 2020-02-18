English | [简体中文](./README.md)

# Egg + React + SSR App Boilerplate

<a href="https://circleci.com/gh/ykfe"><img src="https://img.shields.io/circleci/build/github/ykfe/egg-react-ssr/dev.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/ykfe/egg-react-ssr"><img src="https://codecov.io/gh/ykfe/egg-react-ssr/branch/dev/graph/badge.svg" alt="Coverage Status"></a>
<a href="https://npmcharts.com/compare/yk-cli"><img src="https://img.shields.io/npm/dt/yk-cli" alt="download"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a>
<a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="License"></a>
<a href="https://github.com/ykfe/egg-react-ssr"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<img src="https://img.shields.io/badge/node-%3E=8-green.svg" alt="Node">

This is the most lightweight and elegant SSR (server-side rendering) app boilerplate with the following advantages:

- **Lightweight**: Concise implementation; The bundle size in production is about 40% compared to Nest.js project; Significantly less generated files than Next.js.
- **Versatile**: HMR support; Seamless switching between CSR and SSR in development or in production; Custom component rendering mode; TypeScript support.
- **Elegant**: Based on React and Egg.js and their strong plugin ecosystem; Non-black-box configuration; It's easy to customize your program.

Companies(applications) using this project are as follows. If you are using this project but not on the list, please create an [issue](https://github.com/ykfe/egg-react-ssr/issues) for that, and welcome to share [this project](https://github.com/ykfe/egg-react-ssr).

<table><tr>
<td align="center"><a target="_blank" href="https://www.youku.com"><img src="https://img.alicdn.com/tfs/TB17DTuXkH0gK0jSZPiXXavapXa-680-133.svg" width="100px;" alt="优酷"/><br /><sub><b>youku
</b></sub></a></td>
<td align="center"><a target="_blank" href="https://campaign.vmate.com/diwalilightup"><img src="https://img.alicdn.com/tfs/TB17p6Vhbj1gK0jSZFOXXc7GpXa-512-512.png" width="100px;" alt="vmate 积分商城"/><br />
  <a target="_blank" href="https://job.alibaba.com/zhaopin/position_detail.htm?trace=qrcode_share&positionCode=GP524819"><sub><b>Vmate short video
</b></a></td>
<td align="center"><a target="_blank" href="https://enjoysales.paat.com/"><img src="https://img.alicdn.com/tfs/TB1Ma0BiEY1gK0jSZFMXXaWcVXa-836-836.png" width="100px;" alt="火炽星原CRM"/><br />
<a target="_blank" href="https://enjoysales.paat.com/"><sub><b>paat CRM
</b></a></td>
<td align="center"><a href="https://www.niuniuda.com/mall" target="_blank"><img src="https://img.alicdn.com/tfs/TB1df_8pBr0gK0jSZFnXXbRRXXa-160-60.png" width="100px;" alt="牛牛搭"/><br />
<a href="https://www.niuniuda.com/mall" target="_blank"><sub><b>niu niu constructed
</b></a></td>
<td align="center"><a href="https://help.seewo.com/" target="_blank"><img src="https://img.alicdn.com/tfs/TB11Xo3q4v1gK0jSZFFXXb0sXXa-350-55.png" width="100px;" alt="cvte"/><br /><a href="https://help.seewo.com/" target="_blank"><sub><b>seeowo help
</b></a></td>
<td align="center"><a href="https://wecard.qq.com/index/" target="_blank"><img src="https://img.alicdn.com/tfs/TB1pTZGrFT7gK0jSZFpXXaTkpXa-164-164.jpg" width="100px;" alt="腾讯微卡"/><br />
<a href="https://wecard.qq.com/index/" target="_blank"><sub><b>Tecent Wecard
</b></a></td>
<td align="center"><a href="https://www.myweimai.com/#sectionOne" target="_blank"><img src="https://img.alicdn.com/tfs/TB16i3VrQT2gK0jSZPcXXcKkpXa-400-400.jpg" width="100px;" alt="微脉"/><br />
<a href="https://www.myweimai.com/#sectionOne" target="_bvlank"><sub><b>weimai
</b></a></td>
</tr></table>

## Quick Start

Here we provide a CLI tool to initialize your project:

```bash
$ npm install yk-cli -g
$ ykcli init <Your Project Name> 
$ cd <Your Project Name>
$ npm i
$ npm start
$ open http://localhost:7001
```

When running `ykcli init`, you can choose JavaScript or TypeScript to create the app.

## Features

Let me introduce some awesome features in our app boilerplate: simple to use, powerful functionality, everything is a component, seamless switching between CSR and SSR.

More features:
- [x] App developed by [CRA](https://github.com/facebook/create-react-app) can be migrated seamlessly. If you are familiar with CRA, the start-up cost is almost 0.
- [x] Lightweight and elegant. Compared to highly encapsulated libraries like Beidou and Next.js, our design philosophy are clearer.
- [x] SSR/CSR support; We can switch between SSR and CSR seamlessly in development or in production.
- [x] Frontend router and server-side router are unified to prevent rewriting the same routes.
- [x] The app will automatically fetch data when switching routes.
- [x] HMR support in development.
- [x] Stability has been tested on large-scale online apps and we can provide performance optimization solutions.
- [x] It supports tree shaking and optimizes bundle size.
- [x] Custom CSR/SSR layout support; There is no need to separate them manually by *path*.
- [x] Abandon traditional template engines; Embrace React components and use JSX as the template system.
- [x] Extension with [Antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd).
- [x] Extension with [react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable) for route splitting.
- [x] Extension with [dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva) for data management.
- [x] Extension with Alibaba Cloud serverless [FC](https://github.com/ykfe/ssr-with-fc).
- [x] [TypeScript](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts) support.

### Usage

Both CSR and SSR are unified in terms of usage such as using the static method called `getInitialProps` (similar to Next.js) to fetch data.

```js
function Page(props) {
  return <div> {props.name} </div>;
}

Page.getInitialProps = async ctx => {
  return Promise.resolve({
    name: "Egg + React + SSR"
  });
};

export default Page;
```

#### Explanation

- `render` is a React function for rendering the view.
- `getInitialProps` is the function in which we can fetch data and set the return value to the component state.
	+ CSR: The function is implemented via HOC (High-order Component).
	+ SSR: The function is executed by Node.js.

Running `npm run csr` or `npm run ssr` is the simplest isomorphic rendering method to distinguish between CSR and SSR. When a page is on the very first loading, `getInitialProps` will only be loaded on the server side. Only if the router switches (i.e. by `<Link />` component or API), will the client executes `getInitialProps`.

Parameters of `getInitialProps` are as follows:

- **ctx**: An object used to contain request context of Node.js app, and will only be obtained in SSR.
- **Router Props**: An object contains router infomation like *pathname*, *params*, *history*, etc. Learn more about [react-router](https://reacttraining.com/react-router/).

### Everything is a component

*html*, *meta* and other tags in our basic page template are generated using JSX, keeping you from using tedious template engine syntax.

```js
const commonNode = props =>
	// In order to support SSR and CSR concurrently, please keep this conditional statement.
	// If there is nothing in your layout, use `props.children ? { props.children } : ''`
  props.children ? (
    <div className='normal'>
      <h1 className='title'>
        <Link to='/'>Egg + React + SSR</Link>
        <div className='author'>by ykfe</div>
      </h1>
      {props.children}
    </div>
  ) : (
    ""
  );

const Layout = props => {
  if (__isBrowser__) {
    return commonNode(props);
  } else {
    const { serverData } = props.layoutData;
    const { injectCss, injectScript } = props.layoutData.app.config;
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <title>React App</title>
          {injectCss && injectCss.map(item => <link rel='stylesheet' href={item} key={item} />)}
        </head>
        <body>
          <div id='app'>{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}`
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join("")
            }}
          />
        </body>
      </html>
    );
  }
};
```

### How to change rendering mode

During development, run SSR and CSR concurrently to learn about their differences. In production, switch between two modes by setting `config.type` or using URI query. Besides, we can choose to downgrade the mode to CSR in heavy network traffic.

Refer to this doc: [How to change the rendering mode](http://ykfe.net/guide/faq.html#%E5%A6%82%E4%BD%95%E5%88%87%E6%8D%A2%E6%B8%B2%E6%9F%93%E6%A8%A1%E5%BC%8F).

```bash
$ open http://localhost:7001/          # use SSR
$ open http://localhost:7001/?csr=true # use CSR by URI query (or config.type)
```

## Execution Environment

### Node.js 
Node.js version on your server should be 7.6 or higher for the sake of `async/await` syntax.
### Browser  
React supports **all popular browsers**, including **IE 9 and above**, although some polyfills are required for older browsers such as IE 9 and IE 10. Therefore, you may need to import [Polyfill](https://reactjs.org/docs/javascript-environment-requirements.html).

## Execution Progresss

![](https://gw.alicdn.com/tfs/TB11BwkX8Gw3KVjSZFDXXXWEpXa-2050-1502.jpg)

### Configuration

For flexibility, we provide several key configurable properties to configure. Under ordinary circumstances, we just use the default config.

SSR configuration should be in `config.ssr.js`. We suggest you do not place SSR configuration into Egg configuration in order to prevent exposing the server configuration in the frontend bundle.

```js
// config/config.ssr
const resolvePath = (path) => require('path').resolve(process.cwd(), path)

module.exports = {
    type: 'ssr', // It can be set to `csr` (client-side rendering). At this time, the server will not obtain data to generate strings and will not invoke hydrate API.
    static: {    // Configure the static resource directory of the Node.js app to read static files in production.
      prefix: '/',
      dir: resolvePath('dist')
    },
    routes: [    // Frontend router and server router are unified to prevent rewriting the same routes.
      {
        path: '/',          // requested path
        exact: true,        // whether to match exactly (when you have multiple paths that have similar names)
        Component: () => (require('@/page/index').default), // Here we use a function to wrap `require` in order to make it delay require, otherwise Node.js cannot recognize the import keyword used in fronend component and it will report an error.
        controller: 'page', // the controller that will be invoked
        handler: 'index'    // the specific function invoked in a controller
      },
      {
        path: '/news/:id',
        exact: true,
        Component: () => (require('@/page/news').default),
        controller: 'page',
        handler: 'index'
      }
    ],
    injectCss: [
    `/static/css/Page.chunk.css`
  ], // style sheets the client will load
  injectScript: [
    `<script src='/static/js/runtime~Page.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/Page.chunk.js'></script>`
  ], // staic files the client will load
  serverJs: resolvePath(`dist/Page.server.js`): string|function // server-side bundle; can be a string or require function
}
```

## Directory Structure
The directory structure maintains the style of Egg, such as the `app` and `config` directories. First put the related files of React into the `web` directory, then put the relevant files of webpack build into the `build` directory. On the whole, the directory is reasonable and not complex.

```bash 
├── README.md
├── app    # Egg core directory
│   ├── controller
│   ├── extend
│   ├── middleware
│   └── router.js      # Egg router (Don't change anything under ordinary circumstances)
├── app.js # Egg entry point
├── build  # Webpack config
│   ├── paths.js
│   ├── util.js
│   ├── webpack.config.base.js   # common Webpack config
│   ├── webpack.config.client.js # Webpack config for client build
│   └── webpack.config.server.js # Webpack config for server build
├── config # Egg config
│   ├── config.daily.js
│   ├── config.default.js
│   ├── config.ssr.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── plugin.js
│   └── plugin.local.js
├── dist   # directory of static files after build
│   ├── Page.server.js # server file (i.e. serverRender function) after build
│   └── static         # frontend staic resource after build
└── web    # directory of frontend
    ├── assets
    │   └── common.less
    ├── entry.js       # Webpack entry point (Export different config based on different environment)
    ├── layout
    │   ├── index.js   # page layout
    │   └── index.less
    └── page
        ├── index
        └── news
```

## npm scripts

### Run SSR only

Run the following command and listen on port 7001.

```
$ npm run ssr
```

So far, only server has generated html without hydrating with client.

### Run CSR only

Run the following command and listen on port 8000 (similar to the traditional CRA development).

```
$ npm run csr
```

### Run SSR and CSR concurrently

```bash
$ npm start # start listening port on 7001 (running SSR + CSR hydrate concurrently)
```

### Companion Script

```bash 
$ npm run prod     # simulate production environment of SSR app
$ npm run build    # build resource files from server and client
$ npm run analyze  # visualize and analyze the client build
```

## Changelog

Please read [Release Notes](https://github.com/ykfe/egg-react-ssr/releases) for details of every version.

## Comparison with Other Solutions

- [easy-team](https://github.com/ykfe/egg-react-ssr/wiki/与easy-team实现方案的对比)
- [next.js](https://github.com/ykfe/egg-react-ssr/wiki/与next.js实现方案的对比)

## How to debug the source code locally?

Please read this [wiki](https://github.com/ykfe/egg-react-ssr/wiki/%E6%9C%AC%E5%9C%B0%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95%E6%BA%90%E7%A0%81%E5%B9%B6%E8%B4%A1%E7%8C%AE%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%A0%81).

## Want to contribute?

Please read this [wiki](https://github.com/ykfe/egg-react-ssr/blob/master/CONTRIBUTING.md).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/zhangyuang"><img src="https://avatars3.githubusercontent.com/u/17424434?v=4" width="100px;" alt="LeonCheung"/><br /><sub><b>LeonCheung</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhangyuang" title="Code">💻</a></td>
    <td align="center"><a href="http://i5ting.com"><img src="https://avatars3.githubusercontent.com/u/3118295?v=4" width="100px;" alt="狼叔"/><br /><sub><b>狼叔</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=i5ting" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jerryYuX"><img src="https://avatars2.githubusercontent.com/u/33367577?v=4" width="100px;" alt="jerryYu"/><br /><sub><b>jerryYu</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=jerryYuX" title="Code">💻</a></td>
     <td align="center"><a href="https://github.com/ivc369"><img src="https://avatars0.githubusercontent.com/u/16490377?v=4" width="100px;" alt="Menteceso"/><br /><sub><b>Menteceso</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=ivc369" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.lessing.online/xx-blog/"><img src="https://avatars2.githubusercontent.com/u/21156871?v=4" width="100px;" alt="Xu Zhiyong"/><br /><sub><b>Xu Zhiyong</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3AJohnieXu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jxycbjhc"><img src="https://avatars0.githubusercontent.com/u/16661897?v=4" width="100px;" alt="snoy"/><br /><sub><b>snoy</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=jxycbjhc" title="Documentation">📖</a></td>
    <td align="center"><a href="http://zxy.im"><img src="https://avatars2.githubusercontent.com/u/15117664?v=4" width="100px;" alt="zhaoxingyue"/><br /><sub><b>zhaoxingyue</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhaoxingyue" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.puacode.com"><img src="https://avatars3.githubusercontent.com/u/48011106?v=4" width="100px;" alt="九牧"/><br /><sub><b>九牧</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3Adeancn175" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/robert7git"><img src="https://avatars2.githubusercontent.com/u/6889441?v=4" width="100px;" alt="robert.xu"/><br /><sub><b>robert.xu</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=robert7git" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/c690554125"><img src="https://avatars3.githubusercontent.com/u/13865568?v=4" width="100px;" alt="Cheng Zhongmin"/><br /><sub><b>Cheng Zhongmin</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3Ac690554125" title="Bug reports">🐛</a></td>
        <td align="center"><a href="https://github.com/zhusjfaker"><img src="https://avatars1.githubusercontent.com/u/31839470?v=4" width="100px;" alt="zhushijie"/><br /><sub><b>zhushijie</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/commits?author=zhusjfaker" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JohannLai"><img src="https://avatars0.githubusercontent.com/u/10769405?v=4" width="100px;" alt="JohannLai"/><br /><sub><b>JohannLai</b></sub></a><br /><a href="https://github.com/ykfe/egg-react-ssr/issues?q=author%3AJohannLai" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](LICENSE)

## Consulting and Q&A Group

Although we have tried our best to review and test the codes, there are still some problems existing. If you come across any problems or you'd like to give us any advice, please create an [issue](https://github.com/ykfe/egg-react-ssr/issues) or [PR](https://github.com/ykfe/egg-react-ssr/pulls).

Welcome to join our DingTalk group by scanning the QR Code below.

<img src="https://img.alicdn.com/tfs/TB1X1CsnET1gK0jSZFrXXcNCXXa-750-990.jpg" width="300">

<!-- ## Sponsors
If this project is helpful to you, consider buying us a coffee. Your funds will be used for team building instead of self consumption.

If you are not on our __[Sponsor List](http://ykfe.net/guide/donate.html)__, please create an [issue](https://github.com/ykfe/egg-react-ssr/issues) for that.

<div style="display:flex"><img src="https://gw.alicdn.com/tfs/TB1X1vRouT2gK0jSZFvXXXnFXXa-600-900.jpg" width="200" height="270">
<img src="https://gw.alicdn.com/tfs/TB1BtPToxz1gK0jSZSgXXavwpXa-1242-1686.jpg" width="200" height="270">
</div> -->

