"use strict";
// 模仿 mongoDB 封装数据库
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./model/user");
var article_1 = require("./model/article");
//增加数据
var user = new user_1.UserClass();
user.username = '张三';
user.password = '12345655654757';
user_1.UserModel.add(user);
//获取user表数据
var ures = user_1.UserModel.get(123);
console.log(ures);
//获取文章表的数据
var ares = article_1.ArticleModel.get(1);
console.log(ares);
