import { onBeforeUnmount, onMounted, ref } from 'vue';

//发送消息的类型
enum MessageType {
  START = 'start', //开启轮询，检测Etag版本
  STOP = 'stop', //停止轮询
  CLOSE = 'close', //关闭或刷新页面时，关闭SharedWorker的端口
  REFRESH = 'refresh', //主动刷新
}

//SharedWorker接收到MessageType类型事件后，处理后对应的事件返回，以reflect开头
export enum ReflectMessageType {
  REFLECT_GET_ETAG = 'reflectGetEtag',
  REFLECT_REFRESH = 'reflectRefresh',
}

// 用户消息推送Websocket连接
export default function useSharedWorker(url: string, options: WorkerOptions) {
  const workerRef = ref<SharedWorker>();

  const sendMessage = (type: MessageType, data?: any) => {
    workerRef.value?.port.postMessage({
      type,
      ...data,
    });
  };

  const start = () => {
    sendMessage(MessageType.START);
  };

  const stop = () => {
    sendMessage(MessageType.STOP);
  };

  const close = () => {
    sendMessage(MessageType.CLOSE);
  };

  const refresh = () => {
    sendMessage(MessageType.REFRESH);
  };

  onMounted(() => {
    if (!workerRef.value) {
      workerRef.value = new SharedWorker(url, options);
    }

    window.addEventListener('beforeunload', close);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', close);
  });

  return { start, stop, refresh, workerRef };
}
