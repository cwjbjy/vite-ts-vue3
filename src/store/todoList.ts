import { defineStore } from 'pinia';

export const useTodoList = defineStore('todoList', {
  state: () => {
    return {
      todoList: [
        {
          title: 'TypeScript',
          status: false,
        },
        {
          title: 'Nodejs',
          status: false,
        },
        {
          title: 'Nginx',
          status: false,
        },
        {
          title: 'uni-app',
          status: false,
        },
        {
          title: '跨域解决方案',
          status: true,
        },
        {
          title: 'Vue性能提升',
          status: true,
        },
      ],
    };
  },
  actions: {
    updateTodo(payload: { type: any; data?: string; index?: number }) {
      switch (payload.type) {
        case 'add':
          this.todoList.unshift({
            title: payload.data!,
            status: false,
          });
          break;
        case 'edit':
          this.todoList.forEach((item, index) => {
            if (payload.index === index) {
              item.title = payload.data!;
            }
          });
          break;
        case 'delete':
          this.todoList.splice(payload.index!, 1);
          break;
        default:
          break;
      }
    },
  },
});
