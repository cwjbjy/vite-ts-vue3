import { onMounted, onBeforeUnmount, nextTick, Ref } from 'vue';
import { debounce } from '@/utils/share';

const useResize = (echartRef: Ref<HTMLDivElement | null>) => {
  const debounceAutoSize = debounce(() => {
    nextTick(() => {
      const echartsInstance = window.echarts.getInstanceByDom(echartRef.value);
      echartsInstance.resize();
    });
  }, 300);

  onMounted(() => {
    window.addEventListener('resize', debounceAutoSize, false);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debounceAutoSize, false);
  });
};

export default useResize;
