import { createI18n } from 'vue-i18n';

import { messages } from './i18n';

const i18n = createI18n({
  // 默认语言
  locale: 'zh',

  // 关闭控制台警告
  silentFallbackWarn: true,

  // 设置语言环境
  messages,
});

export default i18n;
