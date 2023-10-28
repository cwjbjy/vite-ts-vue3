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

interface OpenProps {
  params: User;
  closeCallBack: () => void;
}

/**
 * 聊天室服务
 */

class Chat {
  private WSInstance: WebsocketClass | null;
  constructor() {
    this.WSInstance = null;
  }
  //加入聊天室
  open({ params, closeCallBack }: OpenProps) {
    this.WSInstance = new WebsocketClass({ closeCallBack });
    this.WSInstance.connect(params)
      .then(() => {
        ElMessage({
          message: '连接成功',
          type: 'success',
        });
      })
      .catch(() => {
        ElMessage({
          message: '网络错误，请稍后重试',
          type: 'error',
        });
      });
  }
  //发送消息
  sendMessage(params: Message) {
    if (this.WSInstance) {
      this.WSInstance.sendMessage({ msg: params });
    }
  }
  //关闭消息
  close(params: Message) {
    if (this.WSInstance) {
      this.WSInstance.close(params).then(() => {
        ElMessage({
          message: '关闭成功',
          type: 'success',
        });
      });
    }
  }
}

export default new Chat();
