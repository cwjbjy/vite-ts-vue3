import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './routes';
import { TOKEN, MENUS, USER_NAME } from '@/settings/localStorage';
import { LOGIN } from '@/settings/routerMap';

const router = createRouter({
  history: createWebHistory(), //可配置base路径，例如'/app'
  routes,
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to) => {
  NProgress.start();
  /* 手动上报 */
  window.$track.emit('historychange');
  if (to.path === LOGIN) {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(MENUS);
    localStorage.removeItem(USER_NAME);
  }

  const token = localStorage.getItem(TOKEN);

  if (!token && to.path !== LOGIN) {
    return LOGIN;
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
