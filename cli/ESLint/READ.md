## ESLint相关文档

### ESLint相关

+ 官方文档

  http://eslint.cn/

  https://eslint.org/

+ 安装

  ` yarn add -D eslint`

+ 使用

  ` npx eslint ` 等效于 `./node_modules/.bin/eslint `

### 基础使用

+ 初始化

  `npx eslint --init`

+ 手动检测

  `npx eslint ./src/index.js`  
手动检测 src 目录下 index.js 文件  
  `npx eslint ./src/*.js`  
手动检测 src 目录下 所有 js 文件
  
+ 自动检测

  <kbd>package.json</kbd>文件中，添加如下配置

  ```javascript
  "scripts": {
      "eslint": "eslint ./src/*.js"
  }
  ```
  
  使用指令 ``yarn eslint`` 生效

+ 修复

  `npx eslint src/*.js --fix`

### 初始化

执行 `npx eslint --init` 指令后，进入 ESLint 配置界面

#### 通常设置

> ? How would you like to use ESLint? (Use arrow keys) // 你想怎样使用eslint  
> 	To check syntax only // 只检查语法  
> \>  To check syntax and find problems // 检查语法、发现问题  
> 	To check syntax, find problems, and enforce code style // 检查语法、发现问题并执行代码风格
>
> ? What type of modules does your project use? (Use arrow keys) // 您的项目使用什么类型的模块?  
> \> JavaScript modules (import/export)
> 	CommonJS (require/exports)
> 	None of these
> 	
> ? Which framework does your project use? (Use arrow keys) // 使用的项目
>	React
> 	Vue.js
> \> None of these
> 
> ? Does your project use TypeScript? (y/N)
> 
> ? Where does your code run? // 运行的环境
> (*) Browser // 浏览器
> ( ) Node // Nodejs
> 
> ? What format do you want your config file to be in? (Use arrow keys) // 保存的文件格式
> \> JavaScript
> 	YAML
> 	JSON

生成 <kbd>.eslintrc.js</kbd> 文件

> ? How would you like to use ESLint? To check syntax and find problems
> ? What type of modules does your project use? JavaScript modules (import/export)
> ? Which framework does your project use? None of these
> ? Does your project use TypeScript? No
> ? Where does your code run? Browser
> ? What format do you want your config file to be in? JavaScript

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};
```

#### vue设置

> ? How would you like to use ESLint? To check syntax and find problems
> ? What type of modules does your project use? JavaScript modules (import/export)
> ? Which framework does your project use? Vue.js
> ? Does your project use TypeScript? No
> ? Where does your code run? Browser
> ? What format do you want your config file to be in? JavaScript
> ? Would you like to install them now with npm? Yes

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};
```

#### node设置

> ? How would you like to use ESLint ? To check syntax only
> ? What type of modules does your project use? JavaScript modules (import/export)
> ? Which framework does your project use? None of these
> ? Does your project use TypeScript? No
> ? Where does your code run? Node
> ? What format do you want your config file to be in? JavaScript

```javascript
module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};
```

#### 使用不同代码风格（标准）

如果选择了使用预设，在初始化完成后 ESLint 会自动安装所需的相关插件

> ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
> ? What type of modules does your project use? JavaScript modules (import/export)
> ? Which framework does your project use? Vue.js
> ? Does your project use TypeScript? No
> ? Where does your code run? Browser
> ? How would you like to define a style for your project? Use a popular style guide
> ? Which style guide do you want to follow? Standard: https://github.com/standard/standard
> ? What format do you want your config file to be in? JavaScript
> ? Would you like to install them now with npm? Yes

```javascript
module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
  }
}

```

### 配置

#### ESLint 五种配置方式

1. JavaScript

2. YAML

3. JSON

4. 在`package.json` 文件中，添加`eslintConfig`字段，代码如下:

   ```javascript
   {
     "name": "mypackage",
     "version": "0.0.1",
     "eslintConfig": {
         "env": {
             "browser": true,
             "node": true
         }
     },
     "eslintIgnore": ["hello.js", "world.js"]
   }
   ```

5. 在相关的文件中添加注释，代码如下([添加规则](http://eslint.cn/docs/user-guide/configuring#disabling-rules-with-inline-comments))：

   ```javascript
   /* eslint eqeqeq: "off", curly: "error" */
   ```
   

> 如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下
>
> 1. `.eslintrc.js`
> 2. `.eslintrc.yaml`
>
> 3. `.eslintrc.yml`
> 4. `.eslintrc.json`
> 5. `.eslintrc`
> 6. `package.json`

默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 `package.json` 文件或者 `.eslintrc.*` 文件里的 `eslintConfig` 字段下设置 `"root": true`。ESLint 一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找。

> 完整的配置层次结构，从最高优先级最低的优先级，如下:([规则](http://eslint.cn/docs/user-guide/configuring#configuration-cascading-and-hierarchy))
>
> 1. 行内配置
>    1. `/*eslint-disable*/` 和 `/*eslint-enable*/`
>    2. `/*global*/`
>    3. `/*eslint*/`
>    4. `/*eslint-env*/`
> 2. 命令行选项（或 CLIEngine 等价物）：
>    1. `--global`
>    2. `--rule`
>    3. `--env`
>    4. `-c`、`--config`
> 3. 项目级配置：
>    1. 与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json` 文件
>    2. 继续在父级目录寻找 `.eslintrc` 或 `package.json`文件，直到根目录（包括根目录）或直到发现一个有`"root": true`的配置。
> 4. 如果不是（1）到（3）中的任何一种情况，退回到 `~/.eslintrc` 中自定义的默认配置。

#### env

Environments - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。  [Specifying Environments](http://eslint.cn/docs/user-guide/configuring#specifying-environments)

#### globals

Globals - 脚本在执行期间访问的额外的全局变量。[Specifying Globals](http://eslint.cn/docs/user-guide/configuring#specifying-globals)

当访问当前源文件内未定义的变量时，[no-undef](http://eslint.cn/docs/rules/no-undef) 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。

#### [Rules ](http://eslint.cn/docs/rules/)

Rules - 启用的规则及其各自的错误级别。

ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：

+ `"off"` 或 `0` - 关闭规则
+ `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
+ `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

还可以使用 `rules` 连同错误级别和任何你想使用的选项，在配置文件中进行规则配置。例如：

```javascript
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
```

配置定义在插件中的一个规则的时候，你必须使用 `插件名/规则ID` 的形式。比如：

```javascript
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
```

**注意：**当指定来自插件的规则时，确保删除 `eslint-plugin-` 前缀。ESLint 在内部只使用没有前缀的名称去定位规则。

#### [extends](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)

`extends` 属性值可以是：

+ 指定配置的字符串(`配置文件的路径`、可共享配置的名称、`eslint:recommended` 或 `eslint:all`)
+ 字符串数组：每个配置继承它前面的配置

ESLint递归地扩展配置，因此基本配置也可以具有 `extends` 属性。`extends` 属性中的相对路径和可共享配置名从配置文件中出现的位置解析。

`rules` 属性可以做下面的任何事情以扩展（或覆盖）规则：

> + 启用额外的规则
> + 改变继承的规则级别而不改变它的选项：
>   + 基础配置：`"eqeqeq": ["error", "allow-null"]`
>   + 派生的配置：`"eqeqeq": "warn"`
>   + 最后生成的配置：`"eqeqeq": ["warn", "allow-null"]`
> + 覆盖基础配置中的规则的选项
>   + 基础配置：`"quotes": ["error", "single", "avoid-escape"]`
>   + 派生的配置：`"quotes": ["error", "single"]`
>   + 最后生成的配置：`"quotes": ["error", "single"]`

值为 `"eslint:recommended"` 的 `extends` 属性启用一系列核心规则，这些规则报告一些常见问题，在 [规则页面](http://eslint.cn/docs/rules/) 中被标记为 。这个推荐的子集只能在 ESLint 主要版本进行更新。

如果你的配置集成了推荐的规则：在你升级到 ESLint 新的主版本之后，在你使用[命令行](http://eslint.cn/docs/user-guide/command-line-interface#fix)的 `--fix` 选项之前，检查一下报告的问题，这样你就知道一个新的可修复的推荐的规则将更改代码。

`eslint --init` 命令可以创建一个配置，这样你就可以继承推荐的规则。

JavaScript 格式的一个配置文件的例子：

```javascript
module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}
```

一个子文件的配置文件例子：

```javascript
module.exports = {
    "extends": "../../.eslintrc.js",
    "rules": {
        "no-console": "warn"
    }
};
```

##### 规则来自plugin

[插件](http://eslint.cn/docs/developer-guide/working-with-plugins) 是一个 npm 包，通常输出规则。一些插件也可以输出一个或多个命名的 [配置](http://eslint.cn/docs/developer-guide/working-with-plugins#configs-in-plugins)。要确保这个包安装在 ESLint 能请求到的目录下。

`plugins` [属性值](http://eslint.cn/docs/user-guide/configuring#configuring-plugins) 可以省略包名的前缀 `eslint-plugin-`。

`extends` 属性值可以由以下组成：

+ `plugin:`
+ 包名 (省略了前缀，比如，`react`)
+ `/`
+ 配置名称 (比如 `recommended`)

JSON 格式的一个配置文件的例子：

```javascript
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
       "no-set-state": "off"
    }
}
```

##### 规则来自文件

`extends` 属性值可以是到基本[配置文件](http://eslint.cn/docs/user-guide/configuring#using-configuration-files)的绝对路径，也可以是相对路径。ESLint 解析一个相对于使用它的配置文件的基本配置文件的相对路径。

ESLint 解析基本配置文件的相对路径相对你你使用的配置文件，**除非**那个文件在你的主目录或非 ESLint 安装目录的父级目录。在这些情况下，ESLint 解析基本配合文件的相对路径相对于被检测的 **项目**目录（尤其是当前工作目录）。

JSON 格式的一个配置文件的例子：

```javascript
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
```



#### [parserOptions](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)

ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。

请注意，支持 JSX 语法并不等同于支持 React。React 对 ESLint 无法识别的JSX语法应用特定的语义。如果你正在使用 React 并且想要 React 语义支持，我们建议你使用 [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)。

同样的，支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 `Set` 等新类型）。对于 ES6 语法，使用 `{ "parserOptions": { "ecmaVersion": 6 } }`；对于新的 ES6 全局变量，使用 `{ "env":{ "es6": true } }`. `{ "env": { "es6": true } }` 自动启用es6语法，但 `{ "parserOptions": { "ecmaVersion": 6 } }` 不自动启用es6全局变量。

解析器选项可以在 `.eslintrc.*` 文件使用 `parserOptions` 属性设置。可用的选项有：

+ `ecmaVersion` - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)

+ `sourceType` - 设置为 `"script"` (默认) 或 `"module"`（如果你的代码是 ECMAScript 模块)。

+ `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:

  + `globalReturn` - 允许在全局作用域下使用 `return` 语句
  + `impliedStrict` - 启用全局 [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (如果 `ecmaVersion` 是 5 或更高)
  + `jsx` - 启用 [JSX](http://facebook.github.io/jsx/)
  + `experimentalObjectRestSpread` - 启用实验性的 [object rest/spread properties](https://github.com/sebmarkbage/ecmascript-rest-spread) 支持。(**重要：**这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 **不要** 依赖该功能，除非当它发生改变时你愿意承担维护成本。)

`.eslintrc.json` 文件示例：

```javascript
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```

设置解析器选项能帮助 ESLint 确定什么是解析错误，所有语言选项默认都是 `false`。

#### Plugins

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。

在配置文件里配置插件时，可以使用 `plugins` 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀。

```javascript
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```

**注意：**插件是相对于 ESLint 进程的当前工作目录解析的。换句话说，ESLint 将加载与用户通过从项目 Node 交互解释器运行 `('eslint-plugin-pluginname')` 获得的相同的插件。

#### overrides

若要禁用一组文件的配置文件中的规则，请使用 `overrides` 和 `files`。例如:

```javascript
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```



#### [忽略文件及目录](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)

你可以通过在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略特定的文件和目录。`.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。例如，以下将忽略所有的 JavaScript 文件：

```javascript
**/*.js
```

当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个 `.eslintignore` 文件。如果发现了这个文件，当遍历目录时，将会应用这些偏好设置。一次只有一个 `.eslintignore` 文件会被使用，所以，不是当前工作目录下的 `.eslintignore` 文件将不会被用到。



如果没有发现 `.eslintignore` 文件，也没有指定替代文件，ESLint 将在 package.json 文件中查找 `eslintIgnore` 键，来检查要忽略的文件。

```javascript
{
  "name": "mypackage",
  "version": "0.0.1",
  "eslintConfig": {
      "env": {
          "browser": true,
          "node": true
      }
  },
  "eslintIgnore": ["hello.js", "world.js"]
}
```

#### GIT提交校验

`推荐使用 husky` 和  pre-commit` 2种

#####  pre-commit

安装`npm install --save-dev pre-commit`

在`package.josn` 种添加`"pre-commit"` 字段，如下：

```javascript
{
  "name": "437464d0899504fb6b7b",
  "version": "0.0.0",
  "description": "ERROR: No README.md file found!",
  "main": "index.js",
  "scripts": {
    "eslint": "eslint ./src"
  },
  "pre-commit": ["eslint"]
}
```

husky

安装`npm install husky --save-dev`

在`package.josn` 种添加`"husky"` 字段，如下：

```javascript
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run eslint",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```



输入`git commit -m 'Keep calm and commit'`指令提交

