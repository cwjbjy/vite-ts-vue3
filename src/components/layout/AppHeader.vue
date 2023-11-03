<template>
  <div class="header layoutHeader">
    <div class="header_left">
      <span style="margin-left: 10px">PC端后台管理系统(Vue版)</span>
    </div>
    <div class="header_right">
      <!-- 切换主题色 -->
      <el-dropdown class="themeColor" @command="switchColor">
        <span class="iconfont icon-zhuti_tiaosepan_o"></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="gray" :class="active('gray')">简约灰</el-dropdown-item>
            <el-dropdown-item command="blue" :class="active('blue')">胖次蓝</el-dropdown-item>
            <el-dropdown-item command="black" :class="active('black')">夜间模式</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-drop" @command="handleCommand">
        <div class="userImage">
          <img :src="imageUrl" class="user-img" alt="加载失败" />
          <span>
            {{ user_name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a :href="GITHUB" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GITHUB } from '@/settings/user';
import { getImage } from '@/apis/user';
import { echartColor } from '@/settings/echartColor';
import { BUS_IMG } from '@/settings/eventBus';
import type { EchartColorKey } from '@/settings/echartColor';
import { useThemeStore } from '@/store/themeColor';
import { useUserStore } from '@/store/user';
import { IMAGE_URL } from '@/settings/global';

const imageURL = inject(IMAGE_URL);
const userStore = useUserStore();
const themeStore = useThemeStore();
const { updateEchartColor, updateFleetBg, updateTheme } = themeStore;
const router = useRouter();
const emit = defineEmits(['theme']);
const user_name = ref(userStore.user_name);
let imageUrl = computed(() => userStore.imageUrl);
const active = (color: string) => (themeStore.theme === color ? 'dropdownActive' : '');
const getPortrait = () => {
  getImage({
    user_name: user_name.value,
  }).then((res: any) => {
    let fileName = res.data[0].photo;
    userStore.updateImageUrl(`${imageURL}/${fileName}`);
  });
};

const handleCommand = (command: string) => {
  if (command == 'loginout') {
    router.push('/login');
    //清除动态路由缓存
    location.reload();
  }
};
const switchColor = (command: EchartColorKey) => {
  emit('theme', command);
  updateEchartColor(echartColor[command].font);
  updateFleetBg(echartColor[command].fleetBg);
  updateTheme(command);
};

getPortrait();
onMounted(() => {
  window.eventBus.on(BUS_IMG, () => {
    getPortrait();
  });
});
onBeforeUnmount(() => {
  window.eventBus.off(BUS_IMG);
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: inherit;
  &_left {
    width: 50%;
    line-height: 70px;
    font-size: 24px;
    letter-spacing: 2px;
    text-indent: 10px;
    display: inline-flex;
  }
  &_right {
    width: 50%;
    @extend %main_centerRight;
    .user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 5px;
      object-fit: cover;
    }
    .user-drop {
      padding: 5px;
    }
    .userImage {
      display: inline-flex;
      > span {
        line-height: 50px;
      }
    }
  }
}
</style>
<style lang="scss">
@include dropdown;
.iconfont {
  font-size: 30px;
  @include themify($themes) {
    color: themed('icon-font');
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #66b1ff;
}
.dropdownActive {
  background-color: rgba(84, 92, 100, 0.5);
}
</style>
