import { bus } from '@/settings';

interface User {
  type: string;
  name: string;
  image: string;
}

export default class WebsocketClass {
  public client: any;
  public topic: string;
  public closeCallBack: () => void;
  public heartCheck: any;
  constructor({
    topic = '',
    closeCallBack = function () {
      return;
    },
  }) {
    this.client = null; //客户端WebSocket实例
    this.topic = `${import.meta.env.VITE_APP_WS}${topic}`;
    this.closeCallBack = closeCallBack; //关闭连接后的回调方法，由外部传入提高复用性
    const that = this;
    this.heartCheck = {
      //心跳，使用Nginx代理时，默认连接保持60s
      timeOutObj: null,
      reSet() {
        clearTimeout(this.timeOutObj);
        this.bounce();
      },
      bounce() {
        this.timeOutObj = setTimeout(() => {
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
      that.connect().then(() => {
        // console.log('心跳已唤醒');
      });
    }, 1000);
  }

  /*
   *连接
   */
  connect(params?: User) {
    const that = this; //当前WebsocketClass类
    this.client = new WebSocket(this.topic);
    return new Promise((resolve) => {
      this.client.onopen = function () {
        if (this.readyState === this.OPEN) {
          that.heartCheck.bounce();
          if (JSON.stringify(params) != '{}') {
            that.sendMessage({ msg: params });
          }
          resolve(null);
        }
      };
      this.client.onclose = function () {
        // console.log('web channel closed');
        that.closeCallBack(); //this指向当前onclose函数，通过that调用WebsocketClass类
      };
      this.client.onerror = function (error: Error) {
        console.warn('error', error);
        that._heartBeat();
      };
      this.client.onmessage = function (e: { data: string }) {
        const data = JSON.parse(e.data);
        //如果是心跳，组件则不通信
        if (data.name === 'heart') {
          // console.log(data.text);
        } else {
          window.eventBus.$emit(bus.updateWs, data);
        }
        that.heartCheck.reSet();
      };
    });
  }
  /**
   * 发送消息
   */
  sendMessage({ msg = {} }) {
    if (this.client.readyState === this.client.OPEN) {
      this.client.send(JSON.stringify(msg));
    } else {
      console.warn('连接异常');
    }
  }
  /**
   * 断开连接
   */
  close(params: User) {
    return new Promise((resolve) => {
      this.sendMessage({ msg: params });
      this.client.close();
      resolve(null);
    });
  }
}
