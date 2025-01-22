<template>
  <div ref="echartRef" class="myChart"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import { RadarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { storeToRefs } from 'pinia';

import useResize from '@/hooks/useResize';
import { useThemeStore } from '@/store/themeColor';

// 注册必须的组件
echarts.use([GridComponent, RadarChart, CanvasRenderer]);

defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
});

const echartRef = ref();
const themeStore = useThemeStore();
const { echartColor } = storeToRefs(themeStore);

useResize(echartRef);
const prepareDomain = () => {
  let echartsInstance = echarts.getInstanceByDom(echartRef.value);
  if (!echartsInstance) {
    echartsInstance = echarts.init(echartRef.value);
  }
  echartsInstance.clear();
  const dataArr = [
    {
      value: [4300, 4700, 3600, 3900, 3800, 4200],
      name: '车辆数',
      itemStyle: {
        lineStyle: {
          color: '#4A99FF',
        },
        shadowColor: '#4A99FF',
        shadowBlur: 10,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: '#4A99FF',
            },
            {
              offset: 0.5,
              color: 'rgba(0,0,0,0)',
            },
            {
              offset: 1,
              color: '#4A99FF',
            },
          ],
          globalCoord: false,
        },
        opacity: 1,
      },
    },
    {
      value: [3200, 3000, 3400, 2000, 3900, 2000],
      name: '设计车位',
      itemStyle: {
        lineStyle: {
          color: '#4BFFFC',
        },
        shadowColor: '#4BFFFC',
        shadowBlur: 10,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: '#4BFFFC',
            },
            {
              offset: 0.5,
              color: 'rgba(0,0,0,0)',
            },
            {
              offset: 1,
              color: '#4BFFFC',
            },
          ],
          globalCoord: false,
        },
        opacity: 1,
      },
    },
  ];
  const option = {
    color: ['#4A99FF', '#4BFFFC'],
    radar: {
      indicator: [
        {
          name: '小型车',
        },
        {
          name: '中型车',
        },
        {
          name: '大型车',
        },
        {
          name: '货车',
        },
        {
          name: '特种车',
        },
        {
          name: '贵宾车',
        },
      ],
      splitArea: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: echartColor.value,
        },
      },
      splitLine: {
        lineStyle: {
          color: '#113865',
          width: 1,
        },
      },
    },
    series: [
      {
        type: 'radar',
        symbolSize: 8,
        data: dataArr,
      },
    ],
  };
  echartsInstance.setOption(option);
};
watch(echartColor, () => {
  prepareDomain();
});
onMounted(() => {
  prepareDomain();
});
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>
