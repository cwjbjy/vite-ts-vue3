import { BUS_WS } from '@/settings/eventBus';

export default class WebsocketClass {
  public url: string;
  public closeCallBack: () => void;
  private ws: WebSocket | null;
  private heartCheck: any;
  constructor({
    url = '',
    closeCallBack = () => {
      return;
    },
  }) {
    this.ws = null; //客户端WebSocket实例
    this.url = `${import.meta.env.VITE_APP_WS}${url}`;
    this.closeCallBack = closeCallBack; //关闭连接后的回调方法，由外部传入提高复用性
    const that = this;
    this.heartCheck = {
      //心跳，使用Nginx代理时，默认连接保持60s
      timeID: null,
      reSet() {
        clearTimeout(this.timeID);
        this.bounce();
      },
      bounce() {
        this.timeID = setTimeout(() => {
          const heart = {
            type: 'heart',
            text: 'putong',
          };
          that.sendMessage({ msg: heart });
        }, 30000);
      },
    };
  }
  /**
   * 唤醒心跳
   */
  _heartBeat() {
    const that = this;
    setTimeout(() => {
      // console.log('唤醒心跳');
      that.connect({}).then(() => {
        // console.log('心跳已唤醒');
      });
    }, 1000);
  }

  /*
   *连接
   */
  connect(params?: any) {
    const that = this;
    this.ws = new WebSocket(this.url);
    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.onopen = function () {
          if (this.readyState === this.OPEN) {
            that.heartCheck.bounce();
            if (JSON.stringify(params) != '{}') {
              that.sendMessage({ msg: params });
            }
            resolve(null);
          }
        };
        this.ws.onclose = function () {
          // console.log('web channel closed');
          that.closeCallBack(); //this指向当前onclose函数，通过that调用WebsocketClass类
        };
        this.ws.onerror = function (error) {
          console.warn('error', error);
          that._heartBeat();
        };
        this.ws.onmessage = function (e: { data: string }) {
          const data = JSON.parse(e.data);
          //如果是心跳，组件则不通信
          if (data.name === 'heart') {
            // console.log(data.text);
          } else {
            window.eventBus.emit(BUS_WS, data);
          }
          that.heartCheck.reSet();
        };
      }
    });
  }
  /**
   * 发送消息
   */
  sendMessage({ msg = {} }) {
    if (this.ws) {
      if (this.ws.readyState === this.ws.OPEN) {
        this.ws.send(JSON.stringify(msg));
      } else {
        console.warn('连接异常');
      }
    }
  }
  /**
   * 断开连接
   */
  close(params: any) {
    return new Promise((resolve) => {
      if (this.ws) {
        this.sendMessage({ msg: params });
        this.ws.close();
        resolve(null);
      }
    });
  }
}
