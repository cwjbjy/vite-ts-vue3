//echarts基本配置

export function title({ text, color }: { text: string; color: string }) {
  return {
    text,
    left: 'center',
    textStyle: {
      color,
    },
  };
}

export function grid() {
  return {
    bottom: '10%',
  };
}

export function tooltip(type: string, mode?: string) {
  return {
    trigger: type,
    axisPointer: {
      type: mode || 'shadow',
    },
  };
}

export function xAxis({ data, color }: { data?: any; color: string }) {
  return {
    type: 'category',
    data,
    axisLine: {
      show: true,
      lineStyle: {
        color,
      },
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      lineStyle: {
        color,
      },
    },
    axisLabel: {
      show: true,
      color,
    },
    nameTextStyle: {
      color,
    },
  };
}

export function yAxis(color: string) {
  return {
    type: 'value',
    scale: true,
    axisLine: {
      show: true,
      lineStyle: {
        color,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color,
      },
    },
    axisLabel: {
      show: true,
      color,
    },
    nameTextStyle: {
      color,
    },
  };
}

export function legend(color: string) {
  return {
    top: '30',
    left: 'center',
    textStyle: {
      color,
    },
  };
}
