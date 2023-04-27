import { onBeforeUnmount, onMounted, ref, h } from 'vue';
import { ElNotification } from 'element-plus';

const useCheckUpdate = () => {
  const timer = ref();
  const uploadNotificationShow = ref(false); //防止弹出多个框

  const getETag = async () => {
    const response = await fetch(window.location.origin, {
      cache: 'no-cache',
    });
    return response.headers.get('etag') || response.headers.get('last-modified');
  };

  const close = () => {
    uploadNotificationShow.value = false;
  };

  const onRefresh = (new_hash: string) => {
    close();
    // 更新localStorage版本号信息
    localStorage.setItem('vs', new_hash);
    // 刷新页面
    window.location.reload();
  };

  const openNotification = (etag: string) => {
    uploadNotificationShow.value = true;
    ElNotification({
      title: '版本更新提示',
      message: h(
        'p',
        {
          style: {
            fontSize: '14px',
          },
          class: 'pointer',
          on: {
            click: onRefresh(etag),
          },
        },
        '检测到系统当前版本已更新，请刷新后使用。',
      ),
      duration: 0,
      onClose: close,
    });
  };

  onMounted(() => {
    timer.value = setInterval(() => {
      getETag().then((etag) => {
        if (etag) {
          const old_Etag = localStorage.getItem('vs');
          if (!old_Etag) {
            localStorage.setItem('vs', etag);
          } else if (old_Etag !== etag) {
            if (!uploadNotificationShow.value) {
              openNotification(etag);
            }
          }
        }
      });
      // 60秒检测一次
    }, 60000);
  });

  onBeforeUnmount(() => {
    clearInterval(timer.value);
  });
};

export default useCheckUpdate;
