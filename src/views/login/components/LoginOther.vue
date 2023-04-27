<template>
  <footer>
    <div class="other-acc-hd">
      <h3>第三方账号登录</h3>
    </div>
    <div class="img_list">
      <div class="icon" @click="thirdLogin">
        <img src="@/assets/images/login/QQ.png" alt="加载失败" />
      </div>
      <div class="icon" @click="thirdLogin">
        <img src="@/assets/images/login/wb.png" alt="加载失败" />
      </div>
      <div class="icon" @click="thirdLogin">
        <img src="@/assets/images/login/wx.png" alt="加载失败" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

const thirdLogin = () => {
  ElMessage({
    message: '功能未开发，请使用用户注册',
    type: 'warning',
  });
};
</script>

<style scoped lang="scss">
.other-acc-hd {
  width: 65%;
  height: 20px;
  margin: 0 auto 30px auto;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
  position: relative;
  h3 {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    color: #999;
    background: #fff;
    position: absolute;
    left: 22%;
    top: 5px;
  }
}
.img_list {
  @extend %space_around;
  .icon {
    img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
