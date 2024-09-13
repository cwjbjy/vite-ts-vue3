import { onBeforeUnmount, onMounted, ref } from 'vue';

import useCheckUpdateWorker, { ReflectMessageType } from '../utils/worker/checkUpdate/useCheckUpdateWorker';

const useCheckUpdate = () => {
  const forbidUpdate = ref(false); //防止弹出多个框
  const versionRef = ref<string>();
  const { start, stop, workerRef } = useCheckUpdateWorker('/worker/checkUpdate.worker.js', {
    name: 'updateModal',
    type: 'module',
  });

  const handlePageUpdateCheck = (etag: string) => {
    if (etag) {
      const version = versionRef.value;
      if (!version) {
        versionRef.value = etag;
      } else if (version === etag) {
        // eslint-disable-next-line no-console
        console.log('最新版本');
      } else {
        // 版本更新，弹出提示
        if (window.confirm('检测到系统当前版本已更新，请刷新浏览器后使用。')) {
          forbidUpdate.value = false;
          // 刷新页面
          window.location.reload();
        }
      }
    }
  };

  //开启检测
  const startPollingPageUpdate = () => {
    //开发环境不进行版本更新提示
    // if (process.env.NODE_ENV === 'development') return;
    stopPollingPageUpdate();
    start();
  };

  const stopPollingPageUpdate = () => {
    stop();
  };

  const handleVisibilitychange = () => {
    if (document.visibilityState === 'visible') {
      startPollingPageUpdate();
    } else {
      stopPollingPageUpdate();
    }
  };

  onMounted(() => {
    //初始化时，不会触发visibilitychange事件，先主动开启轮询检测
    startPollingPageUpdate();
    document.addEventListener('visibilitychange', handleVisibilitychange);

    if (workerRef.value) {
      //监听worker事件
      workerRef.value.port.onmessage = (e) => {
        const data = e.data || {};
        switch (data.type) {
          case ReflectMessageType.REFLECT_GET_ETAG:
            //forbidUpdate防止重复弹出
            !forbidUpdate.value && handlePageUpdateCheck(data.data);
            break;
          default:
            break;
        }
      };
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilitychange);
  });
};

export default useCheckUpdate;
