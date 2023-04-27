export const isValidPass = (val: string) => {
  //验证密码由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间
  const patt = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
  return patt.test(val);
};
