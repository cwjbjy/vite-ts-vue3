<template>
  <nav v-if="showTags" class="tags">
    <ul>
      <li
        v-for="(item, index) in tagsList"
        :key="index"
        class="tags-li pointer"
        :class="{ active: isActive(item.path) }"
      >
        <span class="tags-li-title" @click="routerClick(item.path)">{{ item.title }}</span>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i className="iconfont icon-guanbi"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

import type { RouteInfo } from '#/config';

import { BUS_ROUTER } from '@/settings/eventBus';
const emit = defineEmits(['update:change']);
const router = useRouter();
const route = useRoute();
const tagsList = ref<RouteInfo[]>([]);
const showTags = computed(() => tagsList.value.length > 0);
// 关闭全部标签
const closeAll = () => {
  tagsList.value = [];
  emit('update:change', tagsList.value);
};

// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.path === route.fullPath;
  });
  tagsList.value = curItem;
  emit('update:change', tagsList.value);
};

// 设置标签
const setTags = (route: RouteLocationNormalizedLoaded) => {
  const isExist = tagsList.value.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    if (tagsList.value.length >= 8) {
      tagsList.value.shift();
    }
    tagsList.value.push({
      title: route.meta.title as string,
      path: route.fullPath,
      // @ts-ignore
      name: route.matched && route.matched[1].components?.default?.__name,
    });
    emit('update:change', tagsList.value);
  }
};

function isActive(path: string) {
  return Object.is(path, route.fullPath);
}
// 关闭单个标签
function closeTags(index: number) {
  tagsList.value.splice(index, 1);
  emit('update:change', tagsList.value);
}
function handleTags(command: string) {
  command === 'other' ? closeOther() : closeAll();
}
function routerClick(value: string) {
  router.push(value);
  window.eventBus.emit(BUS_ROUTER, value);
}

watch(
  route,
  (newValue) => {
    setTags(newValue);
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  ul {
    height: 30px;
  }
  @include themify($themes) {
    background-color: themed('card-background');
  }
  &-li {
    display: inline-flex;
    margin: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
    height: 23px;
    line-height: 23px;
    padding: 0 12px;
    @include themify($themes) {
      border: 1px solid themed('card-border');
      color: themed('card-font');
    }
  }
  &-li.active {
    @include themify($themes) {
      background: themed('card-background-active');
      border: 1px solid themed('card-border-active');
      color: themed('color-font');
    }
    .tags-li-title {
      @include themify($themes) {
        color: themed('color-font');
      }
    }
    .iconfont {
      color: #fff;
    }
  }
  &-li-title {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    @include themify($themes) {
      color: themed('card-font');
    }
  }
  &-li-icon {
    .iconfont {
      font-size: 12px;
      color: #666;
    }
  }
  &-close-box {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 1px;
  }
}
</style>
