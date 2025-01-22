import { onMounted, onBeforeUnmount, nextTick, Ref } from 'vue';

import * as echarts from 'echarts/core';
import { debounce } from 'lodash-es';

const useResize = (echartRef: Ref<HTMLDivElement | undefined>) => {
  const debounceAutoSize = debounce(() => {
    nextTick(() => {
      if (echartRef.value) {
        const echartsInstance = echarts.getInstanceByDom(echartRef.value);
        echartsInstance?.resize();
      }
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
