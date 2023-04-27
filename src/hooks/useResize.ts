import { onMounted, onBeforeUnmount, nextTick, Ref } from 'vue';

const useResize = (echartRef: Ref<HTMLDivElement | null>) => {
  const autoSize = () => {
    nextTick(() => {
      const echartsInstance = window.echarts.getInstanceByDom(echartRef.value);
      echartsInstance.resize();
    });
  };
  onMounted(() => {
    window.addEventListener('resize', autoSize, false);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', autoSize, false);
  });
};

export default useResize;
