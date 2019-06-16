# yk-cli


### 安装

* npm install . -g 

* npm install yk-cli -g


### 命令介绍

* 创建 ykcli init  || ykcli init 应用名(可选)

* 帮助 ykcli help 

* 增加组件 ykcli generate component 组件名 || ykcli gc 组件名 (待实现)

### 开发模式

* 开发 npm run dev

* 构建 npm run build

* 发布 npm publish

### vscode 调试文件

* .vscode/launch.json

```json

{
    "version": "0.2.0",
    "configurations": [{
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "cwd": "${workspaceRoot}",
            "console": "integratedTerminal",
            "protocol": "inspector",
            "restart": true,
            "windows": {
                "runtimeExecutable": "npm.cmd"
            },
            "runtimeArgs": [
                "start",
                "init"
            ],
            "port": 19229
        },
        {
            "type": "node",
            "request": "launch",
            "name": "node",
            "program": "${workspaceRoot}/bin/index.js",
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "runtimeArgs": [
                "--inspect-brk=19229"
            ],
            "console": "integratedTerminal",
            "protocol": "inspector",
            "restart": true,
            "args": [
                "init"
            ],
            "port": 19229
        }
    ]
}


```

### 文件结构

```
.
├── LICENSE
├── README.md
├── bin                                     // 输出的运行的Js命令行文件
├── help.txt                                // 命令行帮助输出内容
├── package.json
├── src                                     // 开发源码文件
│   ├── app.ts                              // 初始化app
│   ├── cache.ts                            // 处理缓存
│   ├── config.ts                           // 应用配置选项
│   ├── help.ts                             // 帮助显示
│   ├── index.ts                            // 命令行入口
│   ├── interface
│   │   └── option.ts                       // 应用配置接口类型
│   ├── package.ts
│   ├── util
│   │   ├── fileconfig.ts                   // 获取文件配置
│   │   ├── readFileList.ts                 // 递归文件夹文件
│   │   ├── render.ts                       // 模板渲染方法
│   │   ├── versionCompare.ts               // 缓存与线上版本比对
│   │   └── versionEffective.ts             // 获取线上版本 判断缓存是否有效
│   ├── webcomponent.ts                     // 编译web下组件模板
│   └── webpackconfig.ts                    // 编译webpack
├── tpl                                     // 编译模板
│   ├── build                               // webpack模板文件
│   │   ├── paths.js.nj
│   │   ├── util.js.nj
│   │   ├── webpack.config.base.js.nj
│   │   ├── webpack.config.client.js.nj
│   │   └── webpack.config.server.js.nj
│   ├── package.json.nj                     // package.json模板文件
│   └── web                                 // web下 组件模板(参考路径必须和example中路径一致才可以编译生效)
│       ├── assets
│       ├── layout
│       └── page
├── tsconfig.json                           // ts编译选项
└── types                                   // 编译类型

```