import { onBeforeUnmount, onMounted, ref } from 'vue';

import { sharedWorkerInstance } from '../sharedWorkerInstance';
//发送消息的类型
enum MessageType {
  INIT = 'init', //初始化，用于传参
  START = 'start', //开启轮询，检测Etag版本
  STOP = 'stop', //停止轮询
  CLOSE = 'close', //关闭或刷新页面时，关闭SharedWorker的端口
  GET_ETAG = 'getEtag', //立即获取ETag
}

//SharedWorker接收到MessageType类型事件后，处理后对应的事件返回，以reflect开头
export enum ReflectMessageType {
  REFLECT_GET_ETAG = 'reflectGetEtag',
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

  const init = () => {
    sendMessage(MessageType.INIT);
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

  const getEtag = () => {
    sendMessage(MessageType.GET_ETAG);
  };

  onMounted(() => {
    if (!workerRef.value) {
      workerRef.value = sharedWorkerInstance(url, options);
      init();
    }

    window.addEventListener('beforeunload', close, false);

    window.addEventListener('unload', close);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', close);
    window.removeEventListener('unload', close);
  });

  return { start, stop, init, getEtag, workerRef };
}
