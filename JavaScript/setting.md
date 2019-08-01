### 本地调试 js 代码配置 说明文档

> 用于 vscode，launch.json 文件<br> 代码如下

```
  {
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [{
      "request": "launch",
      "type": "node",
      "name": "Launch Program",
      "program": "${file}",
      "sourceMaps": true
    }]
  }
```
