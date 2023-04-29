import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ElNotification } from 'element-plus';

const useCheckUpdate = () => {
  const timer = ref();
  let uploadNotificationShow = false; //防止弹出多个框

  const getETag = async () => {
    const response = await fetch(window.location.origin, {
      cache: 'no-cache',
    });
    return response.headers.get('etag') || response.headers.get('last-modified');
  };

  const close = () => {
    uploadNotificationShow = false;
  };

  const openNotification = () => {
    uploadNotificationShow = true;
    ElNotification({
      title: '版本更新提示',
      message: '检测到系统当前版本已更新，请刷新浏览器后使用。',
      duration: 0,
      onClose: close,
    });
  };

  getETag().then((etag) => {
    if (etag) localStorage.setItem('vs', etag); // 更新localStorage版本号信息
  });

  onMounted(() => {
    timer.value = setInterval(() => {
      getETag().then((etag) => {
        if (etag) {
          const old_Etag = localStorage.getItem('vs');
          if (!old_Etag) {
            localStorage.setItem('vs', etag);
          } else if (old_Etag !== etag) {
            if (!uploadNotificationShow) {
              openNotification();
            }
          }
        }
      });
      // 1h检测一次
    }, 3600000);
  });

  onBeforeUnmount(() => {
    clearInterval(timer.value);
  });
};

export default useCheckUpdate;
