<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
      <el-form-item prop="reg_name">
        <el-input v-model.trim="ruleForm.reg_name" placeholder="请输入用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="rge_pass">
        <el-input v-model="ruleForm.rge_pass" placeholder="请输入8-16位由数字与字母组成的密码" show-password>
          <template #prefix>
            <el-icon><Lock /></el-icon> </template
        ></el-input>
      </el-form-item>
      <el-form-item prop="rge_passAgain">
        <el-input v-model="ruleForm.rge_passAgain" placeholder="请再次输入密码" show-password>
          <template #prefix>
            <el-icon><Lock /></el-icon> </template
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="verification_class">
      <el-input v-model="authCode" placeholder="验证码区分大小写"></el-input>
      <div id="v_container" style="width: 200px; height: 40px"></div>
    </div>
    <el-button type="primary" style="width: 100%; margin-top: 18px" @click="handleRegister">注册</el-button>
  </div>
</template>

<script setup lang="ts">
import CryptoJS from 'crypto-es';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

import { register } from '@/apis/user';
import { getTime, randomName } from '@/utils/share';
import { isValidPass } from '@/utils/rules';
const emit = defineEmits(['update:register']);
let verifyCode: any = null;
let moreClick = false;
const ruleFormRef = ref<FormInstance>();
const authCode = ref('');
const ruleForm = reactive({
  reg_name: randomName('游客'),
  verification: '',
  rge_pass: '',
  rge_passAgain: '',
});

const validatePass = (_: any, value: string, callback: (params?: any) => void) => {
  if (!isValidPass(value)) {
    callback(new Error('请输入8-16位由数字与字母组成的密码'));
  } else {
    callback();
  }
};

const validatePass2 = (_: any, value: string, callback: (params?: any) => void) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== ruleForm.rge_pass) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  reg_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  rge_pass: [{ validator: validatePass, trigger: 'blur' }],
  rge_passAgain: [{ validator: validatePass2, trigger: 'blur' }],
});

const handleRegister = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (moreClick) return;
      moreClick = true;
      const res = verifyCode.validate(authCode.value);
      if (res) {
        const params = {
          userName: ruleForm.reg_name,
          passWord: CryptoJS.MD5(ruleForm.rge_pass).toString(),
          authority: 2,
          createTime: getTime(),
          photo: 'userlogo.png',
        };
        register(params)
          .then((res) => {
            ElMessage({
              message: res.msg,
              type: 'success',
            });

            emit('update:register', {
              name: ruleForm.reg_name,
              pass: ruleForm.rge_pass,
            });
          })
          .catch((err) => {
            if (err.response.status === 403) {
              ElMessage({
                message: '用户名已存在，请重新选择用户名',
                type: 'error',
              });
            }
          });
      } else {
        ElMessage({
          message: '验证码错误',
          type: 'error',
        });
      }
    } else {
      ElMessage({
        message: '请检查输入内容',
        type: 'error',
      });
    }
  });
};

defineExpose({
  handleRegister,
});

onMounted(() => {
  verifyCode = new window.GVerify('v_container');
});
</script>

<style lang="scss">
.verification_class {
  display: flex;
  .el-input__inner {
    width: 200px;
  }
}
</style>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}
</style>
