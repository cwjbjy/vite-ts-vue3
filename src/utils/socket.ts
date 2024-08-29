import { io, Socket } from 'socket.io-client';

import { BUS_WS } from '@/settings/eventBus';

export enum TYPE {
  MESSAGE = 'message',
  ADD = 'addUser',
  REMOVE = 'removeUser',
}

class WebSocketClient {
  public socket: Socket | null = null;
  //连接
  connect(data: any) {
    //只使用WebSocket通信，并且最大重连次数为3次
    this.socket = io(import.meta.env.VITE_APP_WS, { transports: ['websocket'], reconnectionAttempts: 3 });

    this.sendMessage(TYPE.ADD, data);

    this.socket.on('message', (data: any) => {
      window.eventBus.emit(BUS_WS, data);
    });
  }

  //发送消息
  sendMessage(type: TYPE, params?: any) {
    if (this.socket) this.socket.emit(type, params);
  }

  //断开连接
  close() {
    if (this.socket) this.socket.disconnect();
  }

  //重新连接
  reconnect(data: any) {
    if (this.socket) {
      this.socket.connect(); //会产生新id

      this.sendMessage(TYPE.ADD, data);
    }
  }
}

export default new WebSocketClient();
