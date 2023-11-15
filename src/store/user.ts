import { defineStore } from 'pinia';

import { USER_NAME } from '@/settings/localStorage';

// 第一个参数是id，id必填，且需要保证值唯一
export const useUserStore = defineStore('user', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      userName: '',
      imageUrl: '',
    };
  },
  getters: {
    user_name: (state) => (state.userName === '' ? localStorage.getItem(USER_NAME) || '' : state.userName),
  },
  actions: {
    updateUserName(userName: string) {
      this.userName = userName;
    },
    updateImageUrl(url: string) {
      this.imageUrl = url;
    },
  },
});
