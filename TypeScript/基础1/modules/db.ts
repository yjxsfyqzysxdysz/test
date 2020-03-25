var dbUrl = 'xxxxxx';

export function getData(): any[] {
  console.log('获取数据库的数据111');
  return [
    {
      title: '121312'
    },
    {
      title: '121312'
    }
  ];
}

export function save() {
  console.log('保存数据成功');
}

// export { dbUrl, getData, save };
// export default getData; // 只有一个要抛出时

// 抛出方法
// 1、在每个要被抛出的 方法/函数 前加 export
// 2、在文件最后 以对象的形式将 方法/函数 抛出

// 一个文件中可以使用多个 export —— 获取方式 import { getData } from './modules/db';
// export default 只能使用一次  —— 获取方式 import getData from './modules/db';
