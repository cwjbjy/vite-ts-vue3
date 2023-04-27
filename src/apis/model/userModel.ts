export interface RowItem {
  admin: null;
  authority: string;
  createTime: string;
  id: number;
  password: string;
  photo: string;
  user_name: string;
}

export interface UsersModel {
  code: number;
  data: RowItem[];
}
