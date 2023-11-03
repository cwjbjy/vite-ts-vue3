/* 路由映射字段 */

/** 登录 */
export const LOGIN = '/login';
/** 登录 */
export const HOME = '/home';
/** 系统首页 */
export const FIRSTITEM = '/firstItem';
/** 模拟航线 */
export const FLEET = '/fleet';
/** 图片上传 */
export const FILUP = '/fileUp';
/** 文件预览 */
export const PDF = '/pdf';
/** 基础图表 */
export const BASE_ECHARTS = '/baseEcharts';
/** 基础表格 */
export const BASE_TABLE = '/baseTable';
/** 拖拽基础路由 */
export const DRAG = '/drag';
/** 拖拽列表 */
export const DRAG_LIST = '/dragList';
/** 拖拽弹框 */
export const DRAG_DIALOG = '/dragDialog';
/** 语言转换 */
export const I18N = '/I18n';
/** 流程图 */
export const FLOW_CHART = '/flowChart';
/** 一般流程图 */
export const COMMON_CHART = '/commonChart';
/** 定位流程图 */
export const POSITION_CHART = '/positionChart';
/** 折叠流程图 */
export const FLOD_CHART = '/foldChart';
/** 放大镜 */
export const MAGNIFYING = '/magnifying';
/** 聊天室 */
export const CHARTROOM = '/chatRoom';
/** 后台管理 */
export const MANAGE = '/manage';

const getKey = (key: string) => {
  return key.replace('/', '');
};

/* 目录树key配置 */

export const KEY_FIRSTITEM = getKey(FIRSTITEM);

export const KEY_FLEET = getKey(FLEET);

export const KEY_FILUP = getKey(FILUP);

export const KEY_PDF = getKey(PDF);

export const KEY_BASE_ECHARTS = getKey(BASE_ECHARTS);

export const KEY_BASE_TABLE = getKey(BASE_TABLE);

export const KEY_DRAG = getKey(DRAG);

export const KEY_DRAG_LIST = getKey(DRAG_LIST);

export const KEY_DRAG_DIALOG = getKey(DRAG_DIALOG);

export const KEY_I18N = getKey(I18N);

export const KEY_FLOW_CHART = getKey(FLOW_CHART);

export const KEY_COMMON_CHART = getKey(COMMON_CHART);

export const KEY_POSITION_CHART = getKey(POSITION_CHART);

export const KEY_FLOD_CHART = getKey(FLOD_CHART);

export const KEY_MAGNIFYING = getKey(MAGNIFYING);

export const KEY_CHARTROOM = getKey(CHARTROOM);

export const KEY_MANAGE = getKey(MANAGE);

/* name */
export const NAME_LOGIN_PAGE = 'LoginPage';

export const NAME_HOME = 'Home';
