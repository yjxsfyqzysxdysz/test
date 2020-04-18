## ts + express + mysql 文件上传、查询demo

### 指令
#### 开发 `npm run watch-dev`
#### 打包 `npm run build`
#### 打包后启动 `npm run serve`

### 地址
> 主页地址
`http://localhost:3000`

> 上传地址
`http://localhost:3000/upload`

> 查询地址
`http://localhost:3000/api/list`

### 全局安装express

`npm install express-generator -g`

#### 使用express指令生成模板

`express --view=jade server-side`
param1: 使用模板类型
param2：项目名称

### 创建文件夹
根目录下创建 config、controller、files、model、types、utils文件夹
将bin文件夹下的www文件移至根目录，改名为server.ts
将app.js、routes/index.js、routes/users.js，均改为ts文件

### 设置ts配置
`tsc --init`
```
"outDir": "./dist"
// "strict": true,
"noImplicitAny": false, 
"moduleResolution": "node",
"paths": {
  "*": ["node_modules/*", "./types/*"]
}
```

### 变更package.json
```
"scripts": {
  "start": "npm run serve",
  "serve": "node ./dist/server.js",
  "build": "tsc && node handle-public.js",
  "watch-dev": "cross-env NODE_ENV=development nodemon -e ts,tsx --exec 'ts-node' ./server.ts"
}
```

### 自行安装mysql
database: ts
user: root
password: 123456

#### 注意
修改/bin/www后，要变更其require('/app')的引入
