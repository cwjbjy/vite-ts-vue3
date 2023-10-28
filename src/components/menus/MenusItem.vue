<template>
  <div>
    <template v-for="item in list" :key="item.name">
      <el-sub-menu v-if="item.children" :index="item.name">
        <template #title>
          <img v-if="item.icon" :src="item.icon" class="icon" alt="加载失败" />
          <span>{{ item.name }}</span>
        </template>
        <menus-item :list="item.children"></menus-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <img v-if="item.icon" :src="item.icon" class="icon" alt="加载失败" />
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/settings/menus';
defineProps<{ list: MenuItem[] }>();
</script>

<style scoped>
.icon {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
</style>
