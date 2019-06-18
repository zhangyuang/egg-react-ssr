'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const multiStream = require('multistream');

const fs = require('fs');

const stringToStream = require('string-to-stream');

const serialize = require('serialize-javascript');

const renderToStream = async (ctx, chunkName, config) => {
  const baseDir = config.baseDir || process.cwd();
  const isLocal = config.env === 'local';
  const isCsr = config.type === 'csr';
  const baseHtml = fs.readFileSync(config.template, 'utf-8').toString();

  if (!global.renderToNodeStream) {
    const ReactDOMServer = require(baseDir + '/node_modules/react-dom/server');

    const {
      renderToNodeStream
    } = ReactDOMServer;
    global.renderToNodeStream = renderToNodeStream;
  }

  let stream;

  if (!isCsr) {
    if (isLocal) {
      // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
      delete require.cache[config.serverJs(chunkName)];
    }

    const serverStream = require(config.serverJs(chunkName));

    const serverRes = await serverStream.default(ctx);
    stream = global.renderToNodeStream(serverRes);
  }

  const docArr = baseHtml.split('<!-- Start Server Render Document -->');
  const beginDoc = docArr[0].trim().replace('\n', '');
  const beginDocStream = stringToStream(beginDoc.replace('<!-- Start Injecting Style Flows Up and Down -->', ` <link rel='stylesheet' href='${config.injectCss(chunkName).join('')}' />`));
  const initialData = !isCsr ? `<script>window.__USESSR__=true;window.__INITIAL_DATA__ =${serialize(ctx.serverData || {})};</script>` : '';
  const injectScript = config.injectScript(chunkName).join('');
  const endDoc = docArr[1].trim().replace('\n', '');
  const endDocStream = stringToStream(endDoc.replace('<!-- Start InitialData Script  -->', initialData).replace('<!-- Start Client Script -->', injectScript));
  const streamArr = isCsr ? [beginDocStream, endDocStream] : [beginDocStream, stream, endDocStream];
  return multiStream(streamArr);
};

var _default = renderToStream;
exports.default = _default;