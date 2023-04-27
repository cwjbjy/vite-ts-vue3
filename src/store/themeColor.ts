import { defineStore } from 'pinia';

// 第一个参数是id，id必填，且需要保证值唯一
export const useThemeStore = defineStore('themeColor', {
  state: () => {
    return {
      echartColor: '#333',
      fleetBg: 'rgb(6,42,88)',
      theme: 'gray',
    };
  },
  actions: {
    updateEchartColor(echartColor: string) {
      this.echartColor = echartColor;
    },
    updateFleetBg(fleetBg: string) {
      this.fleetBg = fleetBg;
    },
    updateTheme(theme: string) {
      this.theme = theme;
    },
  },
});
