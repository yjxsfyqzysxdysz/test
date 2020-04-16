"use strict";
// [1, 2].map((item, index, array) => {
//   return item + 2
// })
var arrayMap = function (array, callback) {
    var i = -1;
    var len = array.length;
    var resArray = [];
    while (++i < len) {
        resArray.push(callback(array[i], i, array));
    }
    return resArray;
};
module.exports = arrayMap;
