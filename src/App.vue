<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';

import useCheckUpdate from '@/hooks/useCheckUpdate';
import { manage } from '@/router/routes';
import { BASR_URL, IMAGE_URL } from '@/settings/global';
import { MANAGE, NAME_HOME } from '@/settings/routerMap';
import { MANAGE_NAME } from '@/settings/user';
import { useUserStore } from '@/store/user';

provide(BASR_URL, import.meta.env.VITE_APP_BASEURL);
provide(IMAGE_URL, import.meta.env.VITE_APP_IMAGE);

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { user_name } = storeToRefs(userStore);

useCheckUpdate(); //检测版本更新的hook

watch(route, async (newVal) => {
  if (user_name.value === MANAGE_NAME) {
    /* 在4.x版本中需手动调用router.replace方法重定向，
          因为动态路由页面刷新时，matched的值为空；
          在3.x版本中，刷新页面添加异步路由，matched有值，不需要再重定向 */
    router.addRoute(NAME_HOME, manage);
    if (newVal.fullPath === MANAGE) {
      await router.replace(MANAGE);
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  min-width: 956px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
