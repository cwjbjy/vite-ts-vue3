import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import i18n from './views/I18n';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import myDirective from './directive';
import './utils/observer';
import 'element-plus/dist/index.css';
import './assets/icon/iconfont.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).use(i18n).use(myDirective);
app.mount('#app');
