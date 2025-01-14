import chartRoutes from './chart';
import dragRoutes from './drag';

import * as path from '@/settings/routerMap';

const LoginPage = () => import('@/views/login/LoginPage.vue');

const NotFound = () => import('@/views/NotFound.vue');

const AppHome = () => import('@/components/layout/AppHome.vue');

const HomePage = () => import('@/views/homePage/HomePage.vue');

const FleetLine = () => import('@/views/fleetLine/FleetLine.vue');

const BaseEcharts = () => import('@/views/baseEcharts/BaseEcharts.vue');

const Magnifying = () => import('@/views/Magnifying.vue');

const FileUp = () => import('@/views/FileUpload.vue');

const PDFPreview = () => import('@/views/PDFPreview.vue');

const I18n = () => import('@/views/I18n/I18nPage.vue');

const Openai = () => import('@/views/AI.vue');

const ChatRoomSocket = () => import('@/views/ChatRoomSocket.vue');

const UserManage = () => import('@/views/UserManage.vue');

const routes = [
  {
    path: '/',
    redirect: path.FIRSTITEM,
  },
  {
    path: path.LOGIN,
    name: path.NAME_LOGIN_PAGE,
    component: LoginPage,
  },
  {
    path: path.HOME,
    component: AppHome,
    name: path.NAME_HOME,
    redirect: path.FIRSTITEM,
    children: [
      {
        path: path.FIRSTITEM,
        meta: {
          title: '系统首页',
        },
        component: HomePage,
      },
      {
        path: path.FLEET,
        meta: {
          title: '模拟航线',
        },
        component: FleetLine,
      },
      {
        path: path.FILUP,
        meta: {
          title: '图片上传',
        },
        component: FileUp,
      },
      {
        path: path.PDF,
        meta: {
          title: '文件预览',
        },
        component: PDFPreview,
      },
      {
        path: path.BASE_TABLE,
        meta: {
          title: '基础图表',
        },
        component: BaseEcharts,
      },
      {
        path: path.I18N,
        meta: {
          title: '语言转换',
        },
        component: I18n,
      },
      {
        path: path.MAGNIFYING,
        meta: {
          title: '放大镜',
        },
        component: Magnifying,
      },
      {
        path: path.CHARTROOM,
        meta: {
          title: '聊天室',
        },
        component: ChatRoomSocket,
      },
      {
        path: path.OPENAI,
        meta: {
          title: '智能对话',
        },
        component: Openai,
      },
      ...chartRoutes,
      ...dragRoutes,
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  },
];

export const manage = {
  path: path.MANAGE,
  meta: {
    title: '后台管理',
  },
  component: UserManage,
};

export default routes;
