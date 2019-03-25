require('./06_requires1');
require('./06_requires2'); // 不会自动加载模块文件下的非index.js文件
// 需添加package.json文件，通过设置main属性来设置自动引入的文件
require('./06_requires3/01.js'); // 手动加载指定的js文件
require('./06_requires4'); // 由于nodejs忽略js后缀，所以在引入文件时，会先引入'**.js'文件，当没有'**.js'文件时才会引入'**'文件夹