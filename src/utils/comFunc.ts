/* eslint-disable prefer-const */
//获取当前时间
export function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    (month as unknown as string) = '0' + month;
  }
  if (day < 10) {
    (day as unknown as string) = '0' + day;
  }
  if (hour < 10) {
    (hour as unknown as string) = '0' + hour;
  }
  if (minute < 10) {
    (minute as unknown as string) = '0' + minute;
  }
  if (second < 10) {
    (second as unknown as string) = '0' + second;
  }
  const time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return time;
}

//引入静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
