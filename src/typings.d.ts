declare module '*.css';
declare module '*.png';
declare module '*.jpg';

declare interface Window {
  echarts: any;
  GVerify: any;
  go: any;
  eventBus: any;
}
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'nprogress';
