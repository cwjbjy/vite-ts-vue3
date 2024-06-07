<template>
  <el-form ref="formRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
    <el-form-item prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入用户名/手机号">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="pass">
      <el-input v-model="ruleForm.pass" placeholder="请输入密码" show-password>
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import CryptoJS from 'crypto-es';
import { ElMessage } from 'element-plus';

import { login } from '@/apis/user';

import type { FormInstance, FormRules } from 'element-plus';

import { CODE_ERROR } from '@/settings/code';
import { TOKEN, MENUS, USER_NAME } from '@/settings/localStorage';
import { FIRSTITEM } from '@/settings/routerMap';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const router = useRouter();
const formRef = ref<FormInstance>();
let moreClick = false;
const ruleForm = reactive({
  name: '一叶扁舟',
  pass: '123456zx',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
const handleLogin = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      if (moreClick) return;
      moreClick = true;
      login({
        userName: ruleForm.name,
        passWord: CryptoJS.MD5(ruleForm.pass).toString(),
      })
        .then((res) => {
          localStorage.setItem(MENUS, res.data.auth);
          localStorage.setItem(TOKEN, res.data.token);
          localStorage.setItem(USER_NAME, ruleForm.name);
          userStore.updateUserName(ruleForm.name);
          router.push(FIRSTITEM);
        })
        .catch((err) => {
          if (err.code === CODE_ERROR) {
            ElMessage({
              message: '用户名或密码错误',
              type: 'error',
            });
          }
        })
        .finally(() => {
          moreClick = false;
        });
    } else {
      ElMessage({
        message: '请检查输入内容',
        type: 'error',
      });
    }
  });
};
const onRegister = (name: string, pass: string) => {
  ruleForm.name = name;
  ruleForm.pass = pass;
  handleLogin();
};
defineExpose({
  handleLogin,
  onRegister,
});
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}
</style>
