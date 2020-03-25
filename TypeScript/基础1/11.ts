// 模仿 mongoDB 封装数据库

import { UserClass, UserModel } from './基础1/model/user';
import { ArticleClass, ArticleModel } from './基础1/model/article';

//增加数据
var user = new UserClass();
user.username = '张三';
user.password = '12345655654757';
UserModel.add(user);

//获取user表数据
var ures = UserModel.get(123);
console.log(ures);

//获取文章表的数据
var ares = ArticleModel.get(1);
console.log(ares);
