/* 接口返回值类型*/

export interface RowItem {
  admin: null;
  authority: string;
  createTime: string;
  id: number;
  password: string;
  photo: string;
  userName: string;
}

export interface UserImage {
  data: { photo: string }[];
}

export interface Login {
  data: {
    token: string;
    auth: string;
  };
}
