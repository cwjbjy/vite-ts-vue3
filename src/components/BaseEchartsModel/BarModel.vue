<template>
  <div ref="echartRef" class="myChart"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

import useResize from '@/hooks/useResize';
import { useThemeStore } from '@/store/themeColor';
import * as base from '@/utils/echartsBase';

const echartRef = ref<HTMLDivElement | null>(null);
const themeStore = useThemeStore();
const { echartColor } = storeToRefs(themeStore);
useResize(echartRef);
const prepareDomain = () => {
  let echartsInstance = window.echarts.getInstanceByDom(echartRef.value);
  if (!echartsInstance) {
    echartsInstance = window.echarts.init(echartRef.value);
  }
  echartsInstance.clear();
  var option = {
    color: ['#3398DB'],
    title: base.title({ text: '柱状图', color: echartColor.value }),
    tooltip: base.tooltip('axis'),
    grid: base.grid(),
    xAxis: base.xAxis({
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: echartColor.value,
    }),
    yAxis: base.yAxis(echartColor.value),
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };
  echartsInstance.setOption(option);
};
onMounted(() => {
  prepareDomain();
});
watch(echartColor, () => {
  prepareDomain();
});
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>
