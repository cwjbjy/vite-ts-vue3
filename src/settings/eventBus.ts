/**防止事件总线命名重名，将事件名都定义在一个js文件中 */
export const bus = {
  /** 上传图片事件 */
  updateImg: 'update:img',

  /**路由跳转 */
  updateRouter: 'update:router',

  /**websocket通信 */
  updateWs: 'page1',
};
