<template>
  <nav>
    <el-menu
      :default-active="$route.path"
      class="sidebar-el-menu"
      :background-color="bgColor"
      :text-color="state.textColor"
      :active-text-color="state.activeTextColor"
      unique-opened
      router
      @select="handleSelect"
    >
      <!-- 适配所有级别菜单 || 递归组件 -->
      <MenusItem :list="newMenus"></MenusItem>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed, ref } from 'vue';

import MenusItem from './MenusItem.vue';

import { menus } from './menus';
import { BUS_ROUTER } from '@/settings/eventBus';
import { echartColor } from '@/settings/echartColor';
import { MENUS } from '@/settings/localStorage';
import { FIRSTITEM } from '@/settings/routerMap';
import { useThemeStore } from '@/store/themeColor';

import type { MenuItem } from './menus';
import type { EchartColorKey } from '@/settings/echartColor';

const themeStore = useThemeStore();

const state = reactive({
  defaultActive: FIRSTITEM,
  textColor: '#fff',
  activeTextColor: '#ffd04b',
});

const newMenus = ref<MenuItem[]>([]);

const bgColor = computed(() => echartColor[themeStore.theme as EchartColorKey].menuBg);

const authMenus = localStorage.getItem(MENUS);

menus.forEach((item: any) => {
  if (item.key && authMenus && authMenus.includes(item.key)) {
    newMenus.value.push(item);
  }
});

const handleSelect = (index: string) => {
  state.defaultActive = index;
};

onMounted(() => {
  window.eventBus.on(BUS_ROUTER, (value: string) => {
    state.defaultActive = value;
  });
});

onBeforeUnmount(() => {
  window.eventBus.off(BUS_ROUTER);
});
</script>

<style scoped lang="scss">
nav {
  height: inherit;
  overflow-y: auto;
  overflow-x: hidden;
}
nav::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>
