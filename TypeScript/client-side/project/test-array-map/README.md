## 关于发布npm

+ 要申请一个npm账号

+ `npm login` 登录，依次输入用户名、用户密码、邮箱

+ `npm whoami` 查看当前用户

+ `npm init` 初始化包信息

```
  package name(包名字)
  version(包版本)
  description(包描述)
  entry point(包里面主文件也就是入口地址)
  test command(包的测试命令是什么，可以先不指定)
  git repository(git地址，这样就可以从npm官网直接点到git上，可以先不指定)
  keywords(关键字，别人搜东西时怎么搜到比较方便)
  author(作者)
  license: (MIT)(包遵循什么样的开源协议)
```

+ `npm publish` 发布包

+ 更新包

  发布包之前，需要手动更新`package.json`文件中的版本

+ 删除包

  取消发布包可能并不像你想象得那么容易，这种操作是受到诸多限制的，撤销发布的包被认为是一种不好的行为

  首先如果就是想要删除当前的这个版本，执行命令`npm unpublish xxx(包名)`，去官网查看发现已经没有这个包了，如果权限不够加上 --force, `npm unpublish xxx(包名) --force`

  使用命令`npm unpublish xxx@1.1.1`（包名@版本名）删除指定版本

  根据规范，只有在发包的`24小时内`才允许撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours），之外的需要我们发邮件给官方来删除

  即使你撤销了发布的包，发包的时候也不能再和被撤销的`包的名称`和`版本`重复了（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

+ `npm i xxx@latest` 下载最新包

#### 注意

+ 不能和已有的包的名字重名

+ npm对包名的限制：不能有`大写字母`/`空格`/`下滑线`

+ 创建`.npmignore`文件，忽略上传文件 (用法同`.gitignore`)



最后，创建`npm`包的文件中测试刚刚上传的`npm`包的话，需要在package.json文件中修改当前文件的名称


`tsc --init` 初始化tsconfig.json文件

