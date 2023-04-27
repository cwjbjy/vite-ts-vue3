<template>
  <div class="login">
    <header class="top">
      <span class="title">PC端管理系统(Vue版)</span>
    </header>
    <main class="main">
      <article class="form">
        <nav class="tab">
          <div :class="{ tab_active: flag }" class="tab_title" @click="flag = !flag">用户登录</div>
          <div :class="{ tab_active: !flag }" class="tab_title" @click="flag = !flag">用户注册</div>
        </nav>
        <section v-show="flag">
          <LoginForm ref="loginRef" />
          <LoginOther />
        </section>
        <section v-show="!flag">
          <LoginRegister ref="registerRef" @update:register="register" />
        </section>
      </article>
    </main>
    <footer class="footer">
      个人小样项目，用于展示自己的技术栈
      <br />
      <span style="cursor: pointer" @click="thirdParty">苏ICP备20022574号-2</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import LoginForm from './components/LoginForm.vue';
import LoginOther from './components/LoginOther.vue';
import LoginRegister from './components/LoginRegister.vue';

const flag = ref(true);
const registerRef = ref<InstanceType<typeof LoginRegister> | null>(null);
const loginRef = ref<InstanceType<typeof LoginForm> | null>(null);

const keyDown = (e: KeyboardEvent) => {
  let key = e.key;
  if (key === 'Enter') {
    if (flag.value) {
      loginRef.value?.handleLogin();
    } else {
      registerRef.value?.handleRegister();
    }
  }
};

const thirdParty = () => {
  window.open('https://beian.miit.gov.cn');
};

const register = ({ name, pass }: { name: string; pass: string }) => {
  loginRef.value?.onRegister(name, pass);
};

onMounted(() => {
  document.addEventListener('keydown', keyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keyDown);
});
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  min-width: 600px;
  color: $color-font;
  background-color: $background-login;
  .top {
    width: 100%;
    height: 20vh;
    @extend %center;
    .title {
      font-size: 50px;
      letter-spacing: 5px;
    }
  }
  .main {
    width: 100%;
    min-height: 450px;
    @extend %center;
  }
  .footer {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .form {
    width: 400px;
    min-height: 370px;
    padding: 30px;
    background: $background-form;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    .tab {
      width: 190px;
      height: 40px;
      margin: 0 auto;
      display: flex;
      box-sizing: border-box;
      &_title {
        display: inline-block;
        flex: 1;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        color: $color-gray;
        cursor: $cursor-pointer;
        &:hover {
          color: $color-font-active;
        }
      }
      &_active {
        color: $color-font-active;
        border-bottom: 2px solid $background-login;
      }
    }
  }
}
</style>
