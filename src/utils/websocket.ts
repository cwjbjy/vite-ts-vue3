import { BUS_WS } from '@/settings/eventBus';

export default class WebSocketClient {
  private url = '';
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0; // 重连次数
  private maxReconnectAttempts = 3; // 最大重连数
  private reconnectInterval = 10000; // 重连间隔
  private heartCheckTimer?: NodeJS.Timeout; //计时器id
  private heartbeatInterval = 30000; //心跳间隔

  constructor(url: string) {
    this.url = url;
  }

  private startHeartCheck() {
    this.heartCheckTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.sendMessage({ type: 'heart', text: 'putong' });
      }
    }, this.heartbeatInterval);
  }

  /* 初始化连接 */
  connect(): Promise<string> {
    return new Promise((resolve) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        return;
      }

      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        // 重置重连次数
        this.reconnectAttempts = 0;
        this.startHeartCheck();
        resolve('连接成功');
      };

      this.ws.onclose = () => {
        clearInterval(this.heartCheckTimer);
      };

      this.ws.onerror = (error) => {
        console.warn('WebSocket error:', error);
        clearInterval(this.heartCheckTimer);
        this.reconnect();
      };

      this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.name !== 'heart') {
          window.eventBus.emit(BUS_WS, data);
        }
      };
    });
  }

  /* 发送消息 */
  sendMessage(params: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(params));
    } else {
      console.warn('WebSocket connection is not open');
    }
  }

  close(): Promise<string> {
    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
        resolve('关闭成功');
      }
    });
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      // eslint-disable-next-line no-console
      console.log(`尝试重连... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      // eslint-disable-next-line no-console
      console.log(`最大重连失败，终止重连: ${this.url}`);
    }
  }
}
