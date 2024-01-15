import * as path from '@/settings/routerMap';

const DragDialog = () => import('@/views/drag/DragDialog.vue');

const DragList = () => import('@/views/drag/DragList.vue');

const dragRoutes = [
  {
    path: path.DRAG_DIALOG,
    meta: {
      title: '拖拽弹框',
    },
    component: DragDialog,
  },
  {
    path: path.DRAG_LIST,
    meta: {
      title: '拖拽列表',
    },
    component: DragList,
  },
];

export default dragRoutes;
