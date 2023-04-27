<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useCheckUpdate from '@/hooks/useCheckUpdate';
import { manage } from '@/router/routes';
import { useUserStore } from '@/store/user';
provide('baseURL', import.meta.env.VITE_APP_BASEURL);
provide('imageURL', import.meta.env.VITE_APP_IMAGE);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { user_name } = storeToRefs(userStore);
useCheckUpdate();
watch(route, async (newVal) => {
  if (user_name.value === '一叶扁舟') {
    /* 在4.x版本中需手动调用router.replace方法重定向，
          因为动态路由页面刷新时，matched的值为空；
          在3.x版本中，刷新页面添加异步路由，matched有值，不需要再重定向 */
    router.addRoute('Home', manage);
    if (newVal.fullPath === '/manage') {
      await router.replace('/manage');
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
