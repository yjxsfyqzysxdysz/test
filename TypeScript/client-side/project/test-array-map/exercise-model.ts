// [1, 2].map((item, index, array) => {
//   return item + 2
// })
const arrayMap = <T, U>(array:T[], callback: (item: T, index: number, array: ReadonlyArray<T>) => U): U[] => {
  let i = -1
  const len = array.length
  const resArray = []
  while (++i < len) {
    resArray.push(callback(array[i], i, array))
  }
  return resArray
}
export = arrayMap