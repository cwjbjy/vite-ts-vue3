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

const ChatRoom = () => import('@/views/ChatRoom.vue');

const UserManage = () => import('@/views/UserManage.vue');

const DragDialog = () => import('@/views/drag/DragDialog.vue');

const DragList = () => import('@/views/drag/DragList.vue');

const CommonChart = () => import('@/views/flowChart/CommonChart.vue');

const FoldChart = () => import('@/views/flowChart/FoldChart.vue');

const routes = [
  {
    path: '/',
    redirect: '/firstItem',
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/home',
    component: AppHome,
    name: 'Home',
    redirect: '/firstItem',
    children: [
      {
        path: '/firstItem',
        meta: {
          title: '系统首页',
        },
        component: HomePage,
      },
      {
        path: '/fleet',
        meta: {
          title: '模拟航线',
        },
        component: FleetLine,
      },
      {
        path: '/fileUp',
        meta: {
          title: '图片上传',
        },
        component: FileUp,
      },
      {
        path: '/pdf',
        meta: {
          title: '文件预览',
        },
        component: PDFPreview,
      },
      {
        path: '/baseEcharts',
        meta: {
          title: '基础图表',
        },
        component: BaseEcharts,
      },
      {
        path: '/commonChart',
        meta: {
          title: '一般流程图',
        },
        component: CommonChart,
      },
      {
        path: '/foldChart',
        meta: {
          title: '折叠流程图',
        },
        component: FoldChart,
      },
      {
        path: '/dragDialog',
        meta: {
          title: '拖拽弹框',
        },
        component: DragDialog,
      },
      {
        path: '/dragList',
        meta: {
          title: '拖拽列表',
        },
        component: DragList,
      },
      {
        path: '/I18n',
        meta: {
          title: '语言转换',
        },
        component: I18n,
      },
      {
        path: '/magnifying',
        meta: {
          title: '放大镜',
        },
        component: Magnifying,
      },
      {
        path: '/chatRoom',
        meta: {
          title: '聊天室',
        },
        component: ChatRoom,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  },
];

export const manage = {
  path: '/manage',
  meta: {
    title: '后台管理',
  },
  component: UserManage,
};

export default routes;
