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
    color: ['#eccc68', '#ff7f50', '#7bed9f', '#70a1ff', '#5352ed', '#2ed573', '#1e90ff', '#3742fa'],
    title: base.title({ text: '折线图', color: echartColor.value }),
    grid: base.grid(),
    xAxis: base.xAxis({
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: echartColor.value,
    }),
    tooltip: base.tooltip('axis', 'line'),
    yAxis: base.yAxis(echartColor.value),
    legend: base.legend(echartColor.value),
    series: [
      {
        name: '邮件营销',
        type: 'line',
        symbol: 'circle',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '联盟广告',
        type: 'line',
        symbol: 'circle',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '视频广告',
        type: 'line',
        symbol: 'circle',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: '直接访问',
        type: 'line',
        symbol: 'circle',
        data: [320, 332, 301, 334, 390, 330, 320],
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
