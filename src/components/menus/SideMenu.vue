<template>
  <!-- 适配所有级别菜单 || 一级二级三级等等... -->
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
      <MenusItem :list="newMenus"></MenusItem>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed, ref } from 'vue';

import MenusItem from './MenusItem.vue';

import { bus, menus, echartColor } from '@/settings';
import { useThemeStore } from '@/store/themeColor';

import type { MenuItem } from '@/settings/menus';
import { EchartColorKey } from '@/settings/echartColor';

const themeStore = useThemeStore();

const state = reactive({
  defaultActive: '/firstItem',
  textColor: '#fff',
  activeTextColor: '#ffd04b',
});

const newMenus = ref<MenuItem[]>([]);

const bgColor = computed(() => echartColor[themeStore.theme as EchartColorKey].menuBg);

const authMenus = localStorage.getItem('authMenus');

menus.forEach((item: any) => {
  if (item.key && authMenus && authMenus.includes(item.key)) {
    newMenus.value.push(item);
  }
});

const handleSelect = (index: string) => {
  state.defaultActive = index;
};

onMounted(() => {
  window.eventBus.$on(bus.updateRouter, (value: string) => {
    state.defaultActive = value;
  });
});

onBeforeUnmount(() => {
  window.eventBus.$off(bus.updateRouter);
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
