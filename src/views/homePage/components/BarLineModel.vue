<template>
  <div ref="echartRef" class="myChart"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

import useResize from '@/hooks/useResize';
import { useThemeStore } from '@/store/themeColor';
import * as base from '@/utils/echartsBase';

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
  let option = {
    title: base.title({
      text: '2019年销售水量和主营业务收入对比',
      color: echartColor.value,
    }),
    grid: base.grid(),
    tooltip: base.tooltip('axis'),
    legend: base.legend(echartColor.value),
    xAxis: base.xAxis({
      data: [
        '当年完成水量',
        '去年同期水量',
        '滚动目标值水量',
        '全年目标值水量',
        '当年完成金额',
        '去年同期金额',
        '滚动目标金额',
        '全年目标值',
      ],
      color: echartColor.value,
    }),
    yAxis: [
      {
        type: 'value',
        name: '亿元',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: echartColor.value,
          },
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          lineStyle: {
            color: echartColor.value,
          },
        },
        axisLabel: {
          show: true,
          color: echartColor.value,
        },
        nameTextStyle: {
          color: echartColor.value,
        },
      },
      {
        type: 'value',
        name: '同比',
        position: 'right',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: echartColor.value,
          },
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          lineStyle: {
            color: echartColor.value,
          },
        },
        axisLabel: {
          show: true,
          formatter: '{value} %', //右侧Y轴文字显示
          color: echartColor.value,
        },
        nameTextStyle: {
          color: echartColor.value,
        },
      },
    ],
    series: [
      {
        name: '销售水量',
        type: 'line',
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: 'circle', //标记的图形为实心圆
        symbolSize: 10, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: '#058cff',
        },
        lineStyle: {
          color: '#058cff',
        },

        //折线图下方的线性渐变

        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#1e90ff',
              },
              {
                offset: 1,
                color: '#70a1ff',
              },
            ],
          },
        },
        data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
      },
      {
        name: '主营业务',
        type: 'bar',
        barWidth: 15,

        //柱状图柱形的线性渐变

        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, // 0% 处的颜色
                  color: '#5352ed',
                },
                {
                  offset: 1, // 100% 处的颜色
                  color: '#3742fa',
                },
              ],
            },
            barBorderRadius: 20,
          },
        },
        data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
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
