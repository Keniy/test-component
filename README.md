# test-component

## 准备工作

### 搭建npm私服

1.在[官网下载](https://www.sonatype.com/oss-thank-you-win64.zip?submissionGuid=2c6a43fc-9aa5-4acc-b995-87cb63b04d66)windows版本的安装程序  
2.以管理员身份运行CMD，切换到解压后的目录(D:/nexus-3.17.0-01/bin)  
> nexus.exe /install 执行安装命令， 成功后会提示Installed service 'nexus  
> nexus.exe /run 运行服务，首次运行需要等待1~2分钟  
***
3.启动完毕后,进入 http://(本机IP):8081，点击右上角Sign In进行登录，默认账号  admin  
默认密码存放在D:/sonatype-work/nexus3/**.password 打开文件后复制密码串进行登录  
登录后会提示修改密码，修改完重新登录即可。  

4.如果提示could not open SCManager 是因为没有使用管理员身份启动CMD

### 添加npm仓库
- 点击左侧菜单Repositories 查看仓库列表

![QQ截图20190725104357](867CB793B56549A7909B876D57B36579)
- 点击Create repository按钮创建仓库 
- group表示分组 hosted表示本机私有 proxy表示远程代理（中央仓库）
- 若registry配置为group（包括hosted和proxy）,首次会从hosted拉取，若无则从proxy拉取并缓存，下次则直接从缓存取

#### 选择npm(proxy)

输入Name npmjs.org Remote storage https://registry.npmjs.org

![2](5E7E0757E618485481CB8310F682C448)

- 再次点击Create repository
#### 选择npm(hosted)  
输入Name：npm-hosted用于存放自己发布的私有包

![3](E2133D45D71643D5812114B088394528)

- 再次点击Create repository 
####  选择npm(group)   
输入Name: npm-group，并在Member repositories里选择之前添加的两个移到右边

![4](8B52ACDD79D24C7191FA4D55611DEB01)

### 配置与验证npm仓库

- ### 添加发布角色用户及权限
1. 添加权限认证 将npm Beared Token Realm 添加至右边

![5](47C5AB928ED34DB4A219909C19181242)
2. 创建nx-deploy角色并赋予一个nx-repository-view-*-*-*的权限码

![6](7B996EEE0D364A1AB3E2C24CAC6DF116)
3. 创建deployer用户 同时设定角色为nx-deploy

![7](B164487563F2416AAC73E35876C7FC7A)

- ### 变更依赖源 

npm config set registry https://registry.npm.taobao.org  
npm i -g nrm  
nrm add private http://http://192.168.2.199:8081/repository/npm-group/  
nrm use private  

- ### 发布流程

> 每次发布前记得在package.json中检查version 有没有修改，要确认比上一个版本号高

- ### 编译文件
```
yarn lib
```

- #### 登录npm
```
npm login -registry http://http://192.168.2.199:8081/repository/npm-hosted/
```

- #### 发布
```
npm publish -registry http://http://192.168.2.199:8081/repository/npm-hosted/
```

- #### 发布成功后在npm-hosted 能看到发布后的包
![8](9FD75BCF0B2B46CD8CECA9A8F14E37CF)

### 使用方式
"dependencies": {  
    "组件库名称": "版本号"  
}  

import 组件库名称 from '组件库名称'  
Vue.use(组件库名称)  

### 项目启动
```
yarn serve
```

### 组件库文件目录结构 
├── examples                      # 示例展示  
│   ├── api                       # 接口类  
│   ├── assets                    # 资源文件夹  
│   ├── common                    # 工具类  
│   ├── components                # 项目内部组件  
│   ├── page                      # 页面  
│   ├── router                    # 路由配置  
│   ├── style                     # 页面样式问题，主题等  
│   ├── App.vue                   # 入口页面  
│   ├── main.js                   # 入口文件 加载组件 初始化等  
├── lib                           # 编译后输出的组件目录  
├── packages                      # 公共组件目录    
│   ├── query-drop-box            # demo组件  
│   ├── simple-input              # demo组件  
│   ├── index.js                  # 组件入口文件  
├── public                        # 静态资源  
│   │── favicon.ico               # favicon图标  
│   └── index.html                # html模板  
├── .gitignore                    # git 配置  
├── .npmignore                    # npm 配置  
├── vue.config.js                 # vue-cli 配置  
├── babel.config.js               # babel 配置  
├── yarn.lock                     # yarn依赖 配置  
└── package.json                  # package.json  

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
