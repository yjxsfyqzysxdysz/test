/*
const getFullName = ({ firstName, lastName }) => {
  return `${firstName} ${lastName}`
}
getFullName({
  firstName: 'ha',
  lastName: 'Li'
})
*/

// 接口 interface
/*
interface NameInfo {
  firstName: string,
  lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`
}
getFullName({
  firstName: 'ha',
  lastName: 'Li'
})
*/

/*
// 可选属性?
interface Vegetable {
  color?: string,
  type: string
}
// 多余属性检查
const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? (color + '') : ''}${type}`
}

getVegetables({ type: 'tomato', color: 'red' })
*/
/**
 * 当要传递多余的参数时，会报错
 * 解决方式1、
 * 使用类型断言
 * eg: getVegetables({ type: 'tomato', color: 'red' } as Vegetable)
 * 解决方法2、
 * 使用索引签名
 * eg: interface Vegetable { color?: string, type: string, [prop: string]: any }
 * 解决方法3、
 * 使用类型兼容性
 * eg: const vegetableInfo = { type: 'tomato', color: 'red' }
 * getVegetables(vegetableInfo)
 * 类型兼容性，即若将B的值赋值给A，要求A中所需要的属性，B中都必须有，多了无所谓
 */

//  只读 readonly
/*
interface Vegetable {
  color?: string,
  readonly type: string
}

const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? (color + '') : ''}${type}`
}
const vegetableInfo = { type: 'tomato', color: 'red' }
let vegetableObj: Vegetable = {
  type: 'tomato'
}
// vegetableObj.type = 'apple' // Cannot assign to 'type' because it is a read-only property.
*/

/*
interface ArrInter {
  0: number,
  readonly 1: string
}
let arrinfo: ArrInter = [1, 'a']
// arrinfo[1] = 'b' // Cannot assign to '1' because it is a read-only property.
*/

// 函数类型
/*
interface AddFunc {
  (num1: number, num2: number): number
}
// type AddFunc = (num1: number, num2: number) => number // ts推荐写法
const add: AddFunc = (n1, n2) => n1 + n2
*/

// 索引类型
/*
interface RoleDic {
  [id: number]: string
}
const role1: RoleDic = {
  0: 'admin'
}
*/

/*
interface RoleDic {
  [id: string]: string
}
const role2: RoleDic = {
  a: 'admin',
  1: 'user'
}
// js会将对象中的number类型先转换为string类型，再作为这个对象的属性名
*/

// 接口的继承 extends
/*
interface Vegetables {
  color: string
}
interface Tomato extends Vegetables {
  radius: number
}
interface Carrot extends Vegetables {
  length: number
}
const tomato: Tomato = {
  radius: 1,
  color: 'red'
}
const carrot: Carrot = {
  length: 2,
  color: 'blue'
}
*/

// 混合类型接口
/*
interface Counter {
  (): void,
  count: number
}
const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}
const counter: Counter = getCounter()
counter()
console.log(counter.count)
counter()
console.log(counter.count)
counter()
console.log(counter.count)
*/
