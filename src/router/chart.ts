import * as path from '@/settings/routerMap';

const CommonChart = () => import('@/views/flowChart/CommonChart.vue');

const FoldChart = () => import('@/views/flowChart/FoldChart.vue');

const chartRoutes = [
  {
    path: path.COMMON_CHART,
    meta: {
      title: '一般流程图',
    },
    component: CommonChart,
  },
  {
    path: path.FLOD_CHART,
    meta: {
      title: '折叠流程图',
    },
    component: FoldChart,
  },
];

export default chartRoutes;
