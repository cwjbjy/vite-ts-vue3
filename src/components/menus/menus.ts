import { getAssetsFile } from '@/utils/share';

import * as path from '@/settings/routerMap';

export interface MenuItem {
  name: string;
  path: string;
  key: string;
  icon?: string;
  children?: {
    name: string;
    path: string;
    key: string;
  }[];
}

export const menus = [
  {
    name: '系统首页',
    path: path.FIRSTITEM,
    key: path.KEY_FIRSTITEM,
    icon: getAssetsFile('menus/home.png'),
  },
  {
    name: '模拟航线',
    path: path.FLEET,
    key: path.KEY_FLEET,
    icon: getAssetsFile('menus/echarts_heatmap.png'),
  },
  {
    name: '图片上传',
    path: path.FILUP,
    key: path.KEY_FILUP,
    icon: getAssetsFile('menus/upload.png'),
  },
  {
    name: '文件预览',
    path: path.PDF,
    key: path.KEY_PDF,
    icon: getAssetsFile('menus/pdf.png'),
  },
  {
    name: '基础图表',
    path: path.BASE_TABLE,
    key: path.KEY_BASE_TABLE,
    icon: getAssetsFile('menus/echarts.png'),
  },
  {
    name: '拖拽组件',
    key: path.KEY_DRAG,
    icon: getAssetsFile('menus/drag.png'),
    children: [
      {
        name: '拖拽列表',
        path: path.DRAG_LIST,
        key: path.KEY_DRAG_LIST,
      },
      {
        name: '拖拽弹框',
        path: path.DRAG_DIALOG,
        key: path.KEY_DRAG_DIALOG,
      },
    ],
  },
  {
    name: '语言转换',
    icon: getAssetsFile('menus/I18n.png'),
    path: path.I18N,
    key: path.KEY_I18N,
  },
  {
    name: '流程图',
    key: path.KEY_FLOW_CHART,
    icon: getAssetsFile('menus/flowChart.png'),
    children: [
      {
        name: '一般流程图',
        path: path.COMMON_CHART,
        key: path.KEY_COMMON_CHART,
      },
      {
        name: '折叠流程图',
        path: path.FLOD_CHART,
        key: path.KEY_FLOD_CHART,
      },
    ],
  },
  {
    name: '放大镜',
    path: path.MAGNIFYING,
    key: path.KEY_MAGNIFYING,
    icon: getAssetsFile('menus/magnifying.png'),
  },
  {
    name: '聊天室',
    path: path.CHARTROOM,
    key: path.KEY_CHARTROOM,
    icon: getAssetsFile('menus/chat.png'),
  },
  {
    name: '后台管理',
    icon: getAssetsFile('menus/manage.png'),
    path: path.MANAGE,
    key: path.KEY_MANAGE,
  },
];
