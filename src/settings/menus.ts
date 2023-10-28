import { getAssetsFile } from '@/utils/share';

export const menus = [
  {
    name: '系统首页',
    path: '/firstItem',
    key: 'firstItem',
    icon: getAssetsFile('menus/home.png'),
  },
  {
    name: '模拟航线',
    path: '/fleet',
    key: 'fleet',
    icon: getAssetsFile('menus/echarts_heatmap.png'),
  },
  {
    name: '图片上传',
    path: '/fileUp',
    key: 'fileUp',
    icon: getAssetsFile('menus/upload.png'),
  },
  {
    name: '文件预览',
    path: '/pdf',
    key: 'pdf',
    icon: getAssetsFile('menus/pdf.png'),
  },
  {
    name: '基础图表',
    path: '/baseEcharts',
    key: 'baseEcharts',
    icon: getAssetsFile('menus/echarts.png'),
  },
  {
    name: '拖拽组件',
    key: 'drag',
    icon: getAssetsFile('menus/drag.png'),
    children: [
      {
        name: '拖拽列表',
        path: '/dragList',
        key: 'dragList',
      },
      {
        name: '拖拽弹框',
        path: '/dragDialog',
        key: 'dragDialog',
      },
    ],
  },
  {
    name: '语言转换',
    icon: getAssetsFile('menus/I18n.png'),
    path: '/I18n',
    key: 'I18n',
  },
  {
    name: '流程图',
    key: 'flowChart',
    icon: getAssetsFile('menus/flowChart.png'),
    children: [
      {
        name: '一般流程图',
        path: '/commonChart',
        key: 'commonChart',
      },
      // {
      //   name: "定位流程图",
      //   path: "/positionChart",
      //   key: "positionChart",
      // },
      {
        name: '折叠流程图',
        path: '/foldChart',
        key: 'foldChart',
      },
    ],
  },
  {
    name: '放大镜',
    path: '/magnifying',
    key: 'magnifying',
    icon: getAssetsFile('menus/magnifying.png'),
  },
  {
    name: '聊天室',
    path: '/chatRoom',
    key: 'chatRoom',
    icon: getAssetsFile('menus/chat.png'),
  },
  {
    name: '后台管理',
    icon: getAssetsFile('menus/manage.png'),
    path: '/manage',
    key: 'manage',
  },
];

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
