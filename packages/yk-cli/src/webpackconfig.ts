import { Optional } from "./interface/option";
import { renderTemplate } from "./util/render";
import path from 'path';



export async function webpack(option: Optional): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const filelist = [
            'tpl/build/paths.js.nj',
            'tpl/build/util.js.nj',
            'tpl/build/webpack.config.base.js.nj',
            'tpl/build/webpack.config.client.js.nj',
            'tpl/build/webpack.config.server.js.nj'
        ]
        filelist.forEach(p => {
            const tplpath = path.resolve(__dirname, '..', p);
            const filepath = `./${option.appname}/${p.replace("tpl/", "").replace(".nj", "")}`;
            renderTemplate(tplpath, filepath, option);
        });
        console.log("webpack设置成功.....")
        resolve(true);
    });
}