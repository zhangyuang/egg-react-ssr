import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    proxy: {
        package: 'egg-proxy',
        enable: true
    }
};

export default plugin;