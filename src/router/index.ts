import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; //
import routes from './routes';

import { trackWeb } from '@/apis/user';
import { getTime } from '@/utils/comFunc';
import { browserType } from '@/utils/comFunc';

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from) => {
  NProgress.start();
  if (to.path === '/login') {
    localStorage.removeItem('token');
    localStorage.removeItem('authMenus');
    localStorage.removeItem('user_name');
  }

  const token = localStorage.getItem('token');

  if (!token && to.path !== '/login') {
    return '/login';
  }

  //埋点，后续完善
  trackWeb({
    data: JSON.stringify({
      vs: 'vue3-manage-vite',
      deviceType: browserType(),
      url: to.path,
      referer: from.path,
      localTime: getTime(),
      delay: '',
    }),
  });
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
