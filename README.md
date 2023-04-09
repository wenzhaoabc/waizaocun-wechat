# 外灶村小程序

外灶村现代化乡村建设项目微信小程序，UI设计参考[ColorUI-GA](https://github.com/XiaokangLei/ColorUI-GA),UI组件库为[tdesign](https://tdesign.tencent.com/miniprogram/overview)

## 运行

拉取代码在微信开发者工具中打开

安装依赖库
```sh
npm install
```

构建npm,转到`工具`>`构建npm`

编译运行

## 目录结构

```text
│  .eslintrc.js                     # eslint配置文件
│  .gitignore                       # git文件忽略配置
│  app.js                           # 入口
│  app.json                         # 全局配置
│  app.wxss                         # 全局样式
│  project.config.json
│  project.private.config.json
│  README.md
│  sitemap.json
│
├─colorui                           # colorui 微信小程序UI库
│  └─components                     # colorui 内置组件
│      ├─calendar
│      ├─canvas2d-ring
│      ├─cu-custom
│      └─skeleton
├─components                        # 自定义组件
│  ├─xr-ar
│  └─xr-model
├─custom-tab-bar                    # 自定义底部导航栏(不可用)
├─images                            # 图片文件夹
│  └─middle
├─pages
│  ├─common                         # 公共页面
│  ├─home                           # 首页，第一个tabbar涉及到的页面
│  │  └─index
│  ├─login                          # 登录页
│  ├─middle                         # 点位改造，第二个tabbar涉及到的页面
│  │  ├─addsite
│  │  ├─arpage
│  │  ├─index
│  │  ├─reform
│  │  ├─savedraft
│  │  ├─share
│  │  └─showmodel
│  └─user                           # 用户个人中心，第三个tabbar涉及到的页面
│      └─index
└─utils                             # js工具类
        http.js                     # 网络请求
        util.js                     # 日期格式化等
```

## 注意事项

- 主分支为main
- 网络请求对wx.request的封装尚未完工，暂时还不能用