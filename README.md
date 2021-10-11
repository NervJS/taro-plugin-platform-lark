# @tarojs/plugin-platform-lark

Taro 插件，用于支持编译飞书(Lark)小程序。

## 版本要求

### Taro 3.3+

请使用本插件的 1.0.1 或以上版本

### Taro 3.1/3.2

请使用本插件的 1.0 以下版本

## Usage

### 安装

``` bash
yarn add @tarojs/plugin-platform-lark
```

### 编译配置

在 config/index.js 中配置插件：

``` js
config = {
  // ...
  plugins: [
    [
      '@tarojs/plugin-platform-lark',
      // 插件选项
      {
        pc: false
      }
    ]
  ]
}
```

### 项目配置

插件支持的项目配置文件是 project.lark.json 或者 project.tt.json (优先前者，项目根目录下手动创建即可)，常用配置内容如下：

```json
{
  "miniprogramRoot": "./",
  "projectname": "taro-lark",
  "description": "taro-lark",
  "appid": "touristappid",
  "setting": {
    "urlCheck": true,
    "es6": true,
    "postcss": false,
    "minified": false
  },
  "compileType": "miniprogram"
}
```

### 编译命令

package.json 添加命令：

``` json
{
  "scripts": {
    "build:lark": "taro build --type lark",
    "dev:lark": "npm run build:lark -- --watch"
  },
}
```

``` bash
# yarn
$ yarn dev:lark
$ yarn build:lark

# npm script
$ npm run dev:lark
$ npm run build:lark

# 仅限全局安装
$ taro build --type lark --watch
$ taro build --type lark

# npx 用户也可以使用
$ npx taro build --type lark --watch
$ npx taro build --type lark

# watch 同时开启压缩
$ set NODE_ENV=production && taro build --type lark --watch # Windows
$ NODE_ENV=production taro build --type lark --watch # Mac
```

### 小程序开发者工具

执行上面任意一个编译命令，下载并打开[飞书小程序开发者工具](https://open.feishu.cn/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN?lang=zh-CN)，导入项目，选择项目根目录下的 dist 目录(即编译配置 config/index.js 中 outputRoot 设置的目录)打开。

## 类型引入

如果当前 taro 项目使用 typescript 作为开发语言，需要在项目中 global.d.ts 文件头部添加如下一行：

``` ts
/// <reference path="./node_modules/@tarojs/plugin-platform-lark/types/shims-lark.d.ts" />
```

## 平台判断

``` js
if (process.env.TARO_ENV === 'lark') {
  // ...
}
```

## 插件选项

| 选项名 | 值 | 默认值 | 是否必填 | 说明 |
| -- | :-: | :-: | :-: | :-: |
| pc | boolean | false | 否 | 指定 Lark 小程序是否支持 PC 端的组件属性(注 1) |
| entry |  string | <空> | 否 | 指定 Lark 小程序编译时的入口文件(注 2) |

注：

1. Lark 小程序支持在 PC 客户端上运行；举个例子，如果此时 view 组件要支持 bindmouseenter / bindmouseleave 这一对属性， 就需要开启这个选项。
2. Taro 的默认小程序编译入口是 src 文件夹下的 app.(ts|js|tsx)，可以设置 entry 为另一个文件的路径来修改 Lark 小程序编译入口，这里的路径是相对于项目编译配置的 sourceRoot (一般是 'src')的，且在入口文件的相同文件夹下需要存在同名的 config 文件(默认入口是 app.(ts|js|tsx)，且存在 app.config.(ts|js))。
