<template>
  <div v-title="title" class="login">
    <header class="top">
      <div class="title">PC端管理系统(Vue版)</div>
      <div class="subTitle">
        已通过Docker+Jenkins+Webhooks实现自动化打包+部署+邮件通知<span class="flow" @click="dialogModal = true">
          （流程图）
        </span>
      </div>
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
      <a :href="GITHUB" target="_blank" class="link">项目仓库</a>
      <br />
      <span class="link" @click="thirdParty">苏ICP备20022574号-2</span>
    </footer>
    <el-dialog v-model="dialogModal" title="流程图" width="90%" custom-class="dialogClass">
      <div>1. 通过Git提交代码到GitHub</div>
      <div>2. GitHub通过Webhooks通知Jenkins</div>
      <div>3. Jenkins fetch源码到工作空间</div>
      <div>4. 编译下载到工作空间的源码</div>
      <div>5. 对源码进行打包</div>
      <div>6. 将打包后的代码发送到云服务器指定目录</div>
      <div>7. 邮件通知</div>
      <div class="pic">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="gutter-row">
              1. <img :src="getAssetsFile('login/1.png')" class="headPortrait" alt="加载失败" /></div
          ></el-col>
          <el-col :span="12">
            <div class="gutter-row">
              2. <img :src="getAssetsFile('login/2.png')" class="headPortrait" alt="加载失败" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="gutter-row">
              3. <img :src="getAssetsFile('login/3.png')" class="headPortrait" alt="加载失败" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="gutter-row">
              4. <img :src="getAssetsFile('login/4.png')" class="headPortrait" alt="加载失败" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { getAssetsFile } from '@/utils/share';

import LoginForm from './components/LoginForm.vue';
import LoginOther from './components/LoginOther.vue';
import LoginRegister from './components/LoginRegister.vue';

import { GITHUB, BEI_AN } from '@/settings/user';

const flag = ref(true);
const title = ref('登录');
const dialogModal = ref(false);
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
  window.open(BEI_AN);
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
:deep(.el-dialog__body) {
  padding-top: 0;
}

.login {
  height: 100vh;
  min-width: 600px;
  color: $color-font;
  background-color: $background-login;

  .pic {
    margin-top: 10px;
  }
  .gutter-row {
    display: flex;
  }
  img {
    object-fit: cover;
    width: 400px;
    margin-left: 10px;
  }
  .top {
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 50px;
      letter-spacing: 5px;
    }
    .subTitle {
      padding-top: 6px;
      .flow {
        cursor: pointer;
      }
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
    .link {
      cursor: pointer;
      color: #fff;
    }
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
