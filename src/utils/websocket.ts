import { BUS_WS } from '@/settings/eventBus';

export default class WebSocketClient {
  private ws: WebSocket | null;
  private heartCheckTimer: NodeJS.Timeout | null;

  constructor(private url: string, private closeCallback: () => void = () => {}) {
    this.ws = null;
    this.heartCheckTimer = null;
    this.initHeartCheck();
  }

  private initHeartCheck() {
    this.heartCheckTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.sendMessage({ type: 'heart', text: 'putong' });
      }
    }, 30000);
  }

  connect(params?: any): Promise<void> {
    return new Promise((resolve) => {
      this.ws = new WebSocket(`${import.meta.env.VITE_APP_WS}${this.url}`);

      this.ws.onopen = () => {
        this.initHeartCheck();
        if (JSON.stringify(params) !== '{}') {
          this.sendMessage(params);
        }
        resolve();
      };

      this.ws.onclose = () => {
        clearInterval(this.heartCheckTimer as NodeJS.Timeout);
        this.closeCallback();
      };

      this.ws.onerror = (error) => {
        console.warn('WebSocket error:', error);
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

  sendMessage(params: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(params));
    } else {
      console.warn('WebSocket connection is not open');
    }
  }

  close(params: any): Promise<void> {
    return new Promise((resolve) => {
      if (this.ws) {
        this.sendMessage(params);
        this.ws.close();
        resolve();
      }
    });
  }

  reconnect() {
    if (this.ws) {
      this.ws.close();
    }
    this.connect({});
  }
}
