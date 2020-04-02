// 枚举
// const test = 1
// const getIndex = () => 2
// enum Status {
//   Uploading = test,
//   Success = getIndex(),
//   Failed = 1
// }
// 获取方式1
// console.log(Status.Uploading)
// 获取方式2
// console.log(Status['Success'])
// console.log(Status.Failed)
// 当枚举赋值使用常量或函数时，其后的枚举值必须对其赋值，否则报错
// console.log(Status)


// 字符串枚举
// ts在2.4版本新增
// 字符串枚举要求每个字段的值必须是字符串或是字面量，或该枚举值中另一个字符串枚举成员
// enum Message {
//   Error = 'Sorry, error',
//   Success = 'Hoho, Success',
//   Faild = Error
// }
// console.log(Message.Error)
// console.log(Message['Success'])
// console.log(Message.Faild)
// 字符串枚举不能使用常量或者计算值的，所以也不能使用其他枚举中的成员

// 异构枚举
// 不推荐使用
// enum Result {
//   Faild = 0,
//   Success = 'success'
// }

// 枚举成员类型和联合枚举类型
// 满足一定条件时，枚举值每个成员和枚举值本身都可以作为一个类型使用

// 1.不带初始值的枚举成员
// enum E { A }
// 2.值为字符串字面量
// enum E { A = 'a' }
// 3.值为数值字面量或者带有负号的数值字面量
// enum E { A = 1, B = -1 }
// 枚举的所有枚举成员都满足以上3种的任意一种，即可作为类型使用

// 枚举成员类型
// enum Animals {
//   Dog = 1,
//   Cat = 2
// }
// interface Dog {
//   type: Animals.Dog
// }
// const dog: Dog = {
//   type: Animals.Dog // 当使用Cat时，会报类型不匹配
// }
// console.log(dog)

// 联合枚举类型
// enum Status {
//   Off,
//   On
// }
// interface Light {
//   status: Status // 此时类型只能是on或off
// }
// const light: Light = {
//   status: Status.Off
// }

// const enum
// 不使用此方法，会将枚举值编译成一个真实的对象
// 使用则直接进行替换
// 使用枚举是为了增加代码的可读性
const enum Animals {
  Dog = 1
}
const dog = Animals.Dog // var dog = 1 /* Dog */ // 编译完成效果
