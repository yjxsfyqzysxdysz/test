"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db2_1 = require("../modules/db2");
//定义数据库的映射
var ArticleClass = /** @class */ (function () {
    function ArticleClass() {
    }
    return ArticleClass;
}());
exports.ArticleClass = ArticleClass;
var ArticleModel = new db2_1.MsSqlDb();
exports.ArticleModel = ArticleModel;
