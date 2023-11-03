/* 一些基础的全局共享方法 */

//获取当前时间
export function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const formatter = (date: number) => {
    let res = '';
    if (date < 10) {
      res = '0' + date;
    } else {
      res = date.toString();
    }
    return res;
  };

  return (
    year +
    '-' +
    formatter(month) +
    '-' +
    formatter(day) +
    ' ' +
    formatter(hour) +
    ':' +
    formatter(minute) +
    ':' +
    formatter(second)
  );
}

//引入静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

//生产随机用户名
export const randomName = (prefix = '', randomLength = 7) => {
  // 兼容更低版本的默认值写法
  prefix === undefined ? (prefix = '') : prefix;
  randomLength === undefined ? (randomLength = 8) : randomLength;

  // 设置随机用户名
  // 用户名随机词典数组
  const nameArr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'g',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ],
  ];
  // 随机名字字符串
  let name = prefix;
  // 循环遍历从用户词典中随机抽出一个
  for (let i = 0; i < randomLength; i++) {
    // 随机生成index
    const index = Math.floor(Math.random() * 2);
    let zm = nameArr[index][Math.floor(Math.random() * nameArr[index].length)];
    // 如果随机出的是英文字母
    if (index === 1) {
      // 则百分之50的概率变为大写
      if (Math.floor(Math.random() * 2) === 1) {
        if (typeof zm === 'string') {
          zm = zm.toUpperCase();
        }
      }
    }
    // 拼接进名字变量中
    name += zm;
  }
  // 将随机生成的名字返回
  return name;
};

//索引
export const isValidKey = function <T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
};

//防抖
export const debounce = (handler: () => void, time: number) => {
  let timer: NodeJS.Timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handler.call(this);
    }, time);
  };
};
