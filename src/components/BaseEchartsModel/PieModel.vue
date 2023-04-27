<template>
  <!-- 圆柱 -->
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
  let option = {
    color: [
      '#eccc68',
      '#ff7f50',
      '#ff6b81',
      '#ffa502',
      '#ff6348',
      '#ff4757',
      '#7bed9f',
      '#70a1ff',
      '#5352ed',
      '#2ed573',
      '#1e90ff',
      '#3742fa',
    ],
    title: base.title({ text: '饼图', color: echartColor.value }),
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: echartColor.value,
      },
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
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
