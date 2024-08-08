import { ElMessage } from 'element-plus';

import WebsocketClass from './websocket';

interface Message {
  type: string;
  text?: string;
}

interface User {
  type: string;
  name: string;
  image: string;
}

/**
 * 聊天室服务
 */

class Chat {
  private WSInstance?: WebsocketClass;
  //加入聊天室
  open(params: User) {
    this.WSInstance = new WebsocketClass(import.meta.env.VITE_APP_WS);
    this.WSInstance.connect().then((res) => {
      ElMessage({
        message: res,
        type: 'success',
      });
      this.sendMessage(params);
    });
  }
  //发送消息
  sendMessage(params: Message) {
    this.WSInstance?.sendMessage(params);
  }
  //关闭消息
  close(params: Message) {
    this.sendMessage(params);
    this.WSInstance?.close().then((res) => {
      ElMessage({
        message: res,
        type: 'success',
      });
    });
  }
}

export default new Chat();
