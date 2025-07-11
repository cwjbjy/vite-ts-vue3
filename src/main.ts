import { createApp } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { init, TYPES } from 'cwj_monitoring';

import App from './App.vue';
import myDirective from './directive';
import i18n from './views/I18n';

import router from '@/router';
import store from '@/store';

import './utils/observer';
import 'element-plus/dist/index.css';
import './assets/icon/iconfont.css';

//自己的npm包，数据埋点
init({
  url: `${import.meta.env.VITE_APP_BASEURL}/track`,
  plugin: [TYPES.ERROR, TYPES.ROUTER], // 启用错误监控,路由监控
  data: {
    vs: 'vue3-manage',
  },
});

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).use(i18n).use(myDirective);
app.mount('#app');
