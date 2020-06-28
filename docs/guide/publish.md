# Node.js 应用部署

如果是使用 egg 框架开发的应用，强烈推荐使用 `egg-scripts` 进行部署，使用 egg 提供的一系列解决方案，包括但不限于:

- 灵活的启动参数
- [Node.js 性能平台](https://www.aliyun.com/product/nodejs)
- [egg-alinode](https://github.com/eggjs/egg-alinode)

egg 提供了从部署、进程守护、监控、问题排查等一系列的解决方案。详情见[egg 部署文档](https://eggjs.org/zh-cn/core/deployment.html)

划重点:

1、如果你没有任何服务端应用部署运维经验，直接生产环境执行 `sudo npm run prod` 即可或选择集成度更高的 Serverless 场景下的[SSR 框架](https://github.com/ykfe/ssr)使用。  
2、如果你有相关经验建议使用 `egg-scripts` 部署 而不是 `pm2`。原因见[文档](https://eggjs.org/zh-cn/faq.html#%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E4%B8%BA%E4%BB%80%E4%B9%88%E6%B2%A1%E6%9C%89%E9%80%89%E5%9E%8B-pm2)]

## 部署流程

有两种部署策略

1、将整个项目文件除 node_modules 以及 build 文件夹之外的所有文件打成 zip 包，然后上传到服务器，在服务器上执行`npm i && npm run prod`来进行依赖的安装以及生成产物的构建和生产环境的服务启动
2、如果你对`npm run prod`这个命令到底干了什么非常熟悉，也可以直接本地构建然后将构建的产物上传，然后修改`prod`脚本，使得服务端只需要进行`Node`服务的启动而不需要执行`Webpack`构建命令

## 使用 nginx 来做负载均衡和端口代理

nginx 作为负载和代理服务可以实现在服务器上的静态资源托管、多应用 route 级别转发等基本需求。

- install

```bash
$ sudo yum install nginx
```

### nginx 托管静态资源

```js
server {
    listen       80;
    server_name  yourServerName;
    root         your/folder;
    index  index.html;
    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;
    location / {}
    error_page 404 /404.html;
        location = /40x.html {
    }
    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

### nginx 开机自启

```bash
$ systemctl enable nginx
$ systemctl restart nginx
```

### 修改用户

nginx 文件首行默认用户为 nginx，需要修改为当前用户名。

### 本地代理某端口的服务

```js
location / {
    proxy_pass http://127.0.0.1:7001;
    proxy_hide_header 'x-frame-options';
    #root   html;
    #index  index.html index.htm;
}
```

### 启动

```bash
$ sudo nginx -c /usr/local/etc/nginx/nginx.conf
```
