// 功能模块——计算圆周长和面积
module.exports = {
  getLength: function (r) {
    return `半径为${r}的圆，周长为：${(3.14 * 2 * r).toFixed(2)}`;
  },
  getArea: function (r) {
    return `半径为${r}的圆，面积为：${(3.14 * r * r).toFixed(2)}`;
  }
}