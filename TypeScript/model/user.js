"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db2_1 = require("../modules/db2");
//定义数据库的映射
var UserClass = /** @class */ (function () {
    function UserClass() {
    }
    return UserClass;
}());
exports.UserClass = UserClass;
var UserModel = new db2_1.MsSqlDb();
exports.UserModel = UserModel;
