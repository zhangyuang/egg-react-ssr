/// <reference types="node" />
import { Context } from 'midway';
import { Config } from './interface/config';
declare const renderToStreamForFaas: (ctx: Context, config: Config) => Promise<import("stream").Stream>;
export default renderToStreamForFaas;
