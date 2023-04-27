<template>
  <div ref="echartRef" class="myChart"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted } from 'vue';

import useResize from '@/hooks/useResize';
import { useThemeStore } from '@/store/themeColor';

defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
});

const echartRef = ref(null);
const themeStore = useThemeStore();
const { echartColor } = storeToRefs(themeStore);

useResize(echartRef);
const prepareDomain = () => {
  let echartsInstance = window.echarts.getInstanceByDom(echartRef.value);
  if (!echartsInstance) {
    echartsInstance = window.echarts.init(echartRef.value);
  }
  echartsInstance.clear();
  var indicator = [
    {
      text: '小型车',
      max: 6000,
    },
    {
      text: '中型车',
      max: 5000,
    },
    {
      text: '大型车',
      max: 5000,
    },
    {
      text: '货车',
      max: 5000,
    },
    {
      text: '特种车',
      max: 5000,
    },
    {
      text: '贵宾车',
      max: 5000,
    },
  ];
  var dataArr = [
    {
      value: [4300, 4700, 3600, 3900, 3800, 4200],
      name: '车辆数',
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#4A99FF',
          },
          shadowColor: '#4A99FF',
          shadowBlur: 10,
        },
      },
      areaStyle: {
        normal: {
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
    },
    {
      value: [3200, 3000, 3400, 2000, 3900, 2000],
      name: '设计车位',
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#4BFFFC',
          },
          shadowColor: '#4BFFFC',
          shadowBlur: 10,
        },
      },
      areaStyle: {
        normal: {
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
    },
  ];
  var option = {
    color: ['#4A99FF', '#4BFFFC'],
    legend: {
      orient: 'vertical',
      textStyle: {
        color: echartColor.value,
      },
      bottom: 0,
      right: 0,
      itemGap: 21,
    },
    radar: {
      indicator: indicator,
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
