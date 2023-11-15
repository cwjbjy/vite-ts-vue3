<template>
  <!-- 圆柱 -->
  <div ref="echartRef" class="myChart"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { storeToRefs } from 'pinia';

import useResize from '@/hooks/useResize';
import * as base from '@/settings/echartsConfig';
import { useThemeStore } from '@/store/themeColor';

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
    color: ['#70a1ff', '#70a1ff'],
    title: base.title({ text: '圆柱图', color: echartColor.value }),
    grid: base.grid(),
    tooltip: base.tooltip('item'),
    xAxis: base.xAxis({
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: echartColor.value,
    }),
    yAxis: Object.assign(base.yAxis(echartColor.value), {
      splitLine: {
        show: true,
        lineStyle: {
          color: echartColor.value,
          type: 'dashed',
          opacity: 0.5,
        },
      },
    }),
    series: [
      {
        type: 'pictorialBar',
        symbolSize: [20, 10],
        symbolOffset: [0, -5],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            show: true,
            position: 'top',
            // "formatter": "{c}%"
          },
        },
        data: [60, 70, 80, 90, 60, 70, 80],
      },
      {
        type: 'pictorialBar',
        symbolSize: [20, 10],
        symbolOffset: [0, 5],
        z: 12,
        data: [60, 70, 80, 90, 60, 70, 80],
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: ['#5352ed'],
            opacity: 0.7,
          },
        },
        barWidth: 20,
        data: [60, 70, 80, 90, 60, 70, 80],
        markLine: {
          silent: true,
          symbol: 'none',
          label: {
            position: 'middle',
          },
          data: [
            {
              name: '目标值',
              yAxis: 80,
              lineStyle: {
                color: '#ffc832',
              },
              label: {
                position: 'end',
                formatter: '{b}\n {c}',
              },
            },
          ],
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
