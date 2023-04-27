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

//判断浏览器类型
export function browserType() {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  //判断是否Opera浏览器
  let isOpera = userAgent.indexOf('Opera') > -1;
  //判断是否IE浏览器
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera;
  //判断是否IE的Edge浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  let isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
  //判断是否Firefox浏览器
  let isFF = userAgent.indexOf('Firefox') > -1;
  //判断是否Safari浏览器
  let isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  //判断Chrome浏览器
  let isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1;

  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) return 'IE7';
    else if (fIEVersion === 8) return 'IE8';
    else if (fIEVersion === 9) return 'IE9';
    else if (fIEVersion === 10) return 'IE10';
    else return 'IE7以下'; //IE版本过低
  }
  if (isIE11) return 'IE11';
  if (isEdge) return 'Edge';
  if (isFF) return 'FF';
  if (isOpera) return 'Opera';
  if (isSafari) return 'Safari';
  if (isChrome) return 'Chrome';
}

//引入静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
