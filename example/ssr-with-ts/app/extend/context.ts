import { Context } from 'egg';
import { Extend } from '../decorator/extend';
import { renderToNodeStream } from 'react-dom/server'
import { Stream } from 'stream';
import fs from 'fs';
import multistream from 'multistream';
import stringToStream from 'string-to-stream';
import serialize from 'serialize-javascript';


@Extend
class ContextExtend {

    public serverData: any = {};

    /**
     * 返回服务端渲染结果
     * 数据流格式
     * @param {*} chunkName webapck 打包的服务端js 
     * @returns {Stream}
     * @memberof ContextExtend
     */
    public async renderToStream(chunkName): Promise<Stream> {
        const self: Context = this as any;
        const isLocal = self.app.config.env === 'local';
        if (isLocal) {
            // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
            delete require.cache[self.app.config.serverJs(chunkName)];
        }
        const serverStream = require(self.app.config.serverJs(chunkName));
        const serverRes = await serverStream.default.$serverRender(self);
        const stream = renderToNodeStream(serverRes);

        const baseHtml = fs.readFileSync(self.app.config.template).toString();
        const DocArr = baseHtml.split('<!-- Start Server Render Document -->');

        const BeginDoc = DocArr[0].trim().replace('\n', '');
        const BeginDocStream = stringToStream(BeginDoc.replace('<!-- Start Injecting Style Flows Up and Down -->', ` <link rel='stylesheet' href='${self.app.config.injectCss(chunkName).join('')}' />`));
        const InitialData = `<script>window.__USESSR__=true;window.__INITIAL_DATA__ =${serialize(this.serverData || {})};</script>`;
        const injectSrcipt = self.app.config.injectSrcipt(chunkName).join('');

        const EndDoc = DocArr[1].trim().replace('\n', '');
        const EndDocStream = stringToStream(EndDoc.replace('<!-- Start InitialData Script  -->', InitialData).replace('<!-- Start Client Script -->', injectSrcipt));
        return multistream([BeginDocStream, stream, EndDocStream]);
    }

}
export default Reflect.getOwnMetadata("core-enum", ContextExtend.prototype) as ContextExtend;