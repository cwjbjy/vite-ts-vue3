import HttpClient from '@/utils/fetch';
import { Url } from './url';

import type {
  LoginParams,
  RegisterParams,
  UserIdParams,
  UpdateUserParams,
  UserNameParams,
  TrackParams,
} from './types/userType';

//登录
export const login = (params: LoginParams) => {
  return HttpClient.post(Url.Login, params);
};

//注册
export const register = (params: RegisterParams) => {
  return HttpClient.post(Url.Register, params);
};

//获取所有用户信息
export const user = () => {
  return HttpClient.get(Url.GetAllUser);
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
  return HttpClient.get(Url.GetImage, params);
};

//获取用户单条信息
export const getUser = (params: UserNameParams) => {
  return HttpClient.get(Url.GetUser, params);
};

//埋点
export const trackWeb = (params: TrackParams) => {
  return HttpClient.get(Url.Track, params);
};
