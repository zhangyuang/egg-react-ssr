import { Context } from 'midway';
import { Config } from './interface/config';
declare const renderToStream: (ctx: Context, config: Config) => Promise<any>;
export default renderToStream;
