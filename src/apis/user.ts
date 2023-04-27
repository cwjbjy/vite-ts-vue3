import HttpClient from '@/utils/axios';
import type {
  RegisterParams,
  UserIdParams,
  UpdateUserParams,
  UserNameParams,
  TrackParams,
  UsersModel,
} from './types/userType';

enum Api {
  Login = '/login',
  Register = '/register',
  GetAllUser = '/user',
  DeleteUser = '/deleteUser',
  UpdateUser = '/updateUser',
  GetImage = '/getImage',
  GetUser = '/getUser',
  Track = '/getUserInfo',
}

//登录
export const login = (params: URLSearchParams) => {
  return HttpClient.post(Api.Login, params);
};

export const register = (params: RegisterParams) => {
  return HttpClient.post(Api.Register, params);
};

//获取所有用户信息
export const user = () => {
  return HttpClient.get<UsersModel>(Api.GetAllUser);
};

//删除普通用户 /Query String Parameters拼接在URL上 通常用于get与delete
export const deleteUser = (params: UserIdParams) => {
  return HttpClient.delete(Api.DeleteUser, { params: params });
};

//修改管理员账户信息
export const updateUser = (params: UpdateUserParams) => {
  return HttpClient.put(Api.UpdateUser, params);
};

//获取上传图片
export const getImage = (params: UserNameParams) => {
  return HttpClient.get(Api.GetImage, { params: params });
};

//获取用户单条信息
export const getUser = (params: UserNameParams) => {
  return HttpClient.get(Api.GetUser, { params: params });
};

//获取用户单条信息
export const trackWeb = (params: TrackParams) => {
  return HttpClient.get(Api.Track, { params: params });
};
