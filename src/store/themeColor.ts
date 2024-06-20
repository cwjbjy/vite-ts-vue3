import { defineStore } from 'pinia';

const initalState = {
  echartColor: '#333',
  fleetBg: 'rgb(6,42,88)',
  theme: 'gray',
};

type State = typeof initalState;

// 第一个参数是id，id必填，且需要保证值唯一
export const useThemeStore = defineStore('themeColor', {
  state: () => initalState,
  actions: {
    updateTheme({ echartColor, fleetBg, theme }: State) {
      this.echartColor = echartColor;
      this.fleetBg = fleetBg;
      this.theme = theme;
    },
  },
  persist: true,
});
