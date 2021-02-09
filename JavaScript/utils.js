
// 获取单个cookie
export const getCookie = key => {
key+='='
const cookie=document.cookiesplit(';')
for(const e of cookie) {
while(e.charAt(0)===' ')e=e.slice(1)
if(e.includes(key)) return e.slice(key.length)
}
}

// 获取全部cookies
// 设置cookie
// 清楚cookie
// 确认浏览器
// 计算空间大小
// Map 按 key 升序排列
// Set 升序排列
// 获取地址栏
// 正则 phone，mail，password，passwordNumber
// 检验特殊字符 .,:+_*-=/&^;()\<|[{'`＂}]>$%#
// 转换特殊字符
// 判断是否有emoji表情
// 时间转换
// 获取随机颜色
// 判定当前设备类型（pad，phone，pc）
// 字符串隔8位匿名化
// 对象比较
// 对象深拷贝
// 获取随机id（10位，雪花算法）
// 将图片转成base64
// 将图片的base64转成Blob形式
// 生成缩略图（canvas）
// Dom 事件监听 添加/修改
// Dom 事件监听 取消/清空
// local/sessionstorage 获取/设置/清空
// 去除字符串两侧空格
// 清空数组（不改变指针）
// 数组去重
// 检测数据类型
// 字符补0
// 获取字符长度（Unicode 128-1 ff-2 fff-3 4）
// 使用Object.defineProperty 添加es6方法
// 汉字-Unicode
// Unicode-汉字
// 获取月份
// Vue.extend创建toast
// 根据滚动计算可视区域数据
// 双击？
// axios 全局异常处理
