import { ElMessage } from 'element-plus';

import WebsocketClass from './ws';

interface Message {
  type: string;
  text?: string;
}

let WSInstance: any = null;

/**
 * 聊天室服务接口
 */

export default {
  joinMeeting({
    params = {},
    closeCallBack = function () {
      return;
    },
  }) {
    WSInstance = new WebsocketClass({ closeCallBack });
    WSInstance.connect(params)
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
  },
  sendMessage(params: Message) {
    WSInstance.sendMessage({ msg: params });
  },
  close(params: Message) {
    WSInstance.close(params).then(() => {
      ElMessage({
        message: '关闭成功',
        type: 'success',
      });
    });
  },
};
