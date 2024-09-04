import HttpClient from '@/utils/fetch';

import { Url } from './url';

import type { RowItem, UserImage, Login } from './model/userModel';
import type { LoginParams, RegisterParams, UserIdParams, UpdateUserParams, UserNameParams } from './types/userType';

//登录
export const login = (params: LoginParams) => {
  return HttpClient.post<Login>(Url.Login, params);
};

//注册
export const register = (params: RegisterParams) => {
  return HttpClient.post<{ msg: string }>(Url.Register, params);
};

//获取所有用户信息
export const user = () => {
  return HttpClient.get<{ data: RowItem[] }>(Url.GetAllUser);
};

//删除普通用户
export const deleteUser = (params: UserIdParams) => {
  return HttpClient.delete(Url.DeleteUser, params);
};

//修改管理员账户信息
export const updateUser = (params: UpdateUserParams) => {
  return HttpClient.put(Url.UpdateUser, params);
};

//获取上传图片
export const getImage = (params: UserNameParams) => {
  return HttpClient.get<UserImage>(Url.GetImage, params);
};

//获取用户单条信息
export const getUser = (params: UserNameParams) => {
  return HttpClient.get<{ data: string }>(Url.GetUser, params);
};
