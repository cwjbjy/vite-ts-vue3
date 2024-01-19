<template>
  <section>
    <el-card shadow="hover">
      <strong>管理员登录方可看到后台管理页面</strong>
      <div class="frontArea">
        <el-table
          id="out-table"
          :data="tableData"
          max-height="500px"
          style="width: 100%"
          :border="true"
          header-align="center"
        >
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="用户名" prop="user_name" align="center"></el-table-column>
          <el-table-column label="单击图像可以放大" align="center">
            <template #default="scope">
              <img
                style="width: 100px; height: 100px"
                :src="imageURL + scope.row.photo"
                alt="加载失败"
                :style="{ objectFit: 'cover' }"
              />
            </template>
          </el-table-column>
          <el-table-column label="角色描述" align="center">
            <template #default="scope">
              <span :class="[scope.row.authority == 1 ? 'blue' : '']">{{
                scope.row.authority == 1 ? '管理员' : '普通用户'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" prop="createTime" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="scope">
              <span v-if="scope.row.authority == 1" class="btn" @click="handleEdit(scope.row)">编辑</span>
              <span v-if="scope.row.authority != 1" class="red btn" @click="handleDelete(scope.row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="编辑" class="userDialog">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="pass" label-width="100px">
          <el-input v-model="form.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeUser">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onActivated } from 'vue';

import CryptoJS from 'crypto-es';
import { ElMessage, ElMessageBox } from 'element-plus';

import { RowItem } from '@/apis/model/userModel';
import { user, deleteUser, updateUser } from '@/apis/user';

import { IMAGE_URL } from '@/settings/global';

const imageURL = inject(IMAGE_URL);
const ruleForm = ref(null);
let tableData = ref<RowItem[]>([]);
const dialogFormVisible = ref(false);
const form = reactive({ name: '', pass: '' });
let row = reactive({});
const rules = reactive({
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const init = () => {
  user().then((res) => {
    tableData.value = res.data;
  });
};

const handleDelete = (val: number) => {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteUser({
        id: val,
      }).then(() => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
        init();
      });
    })
    .catch(() => {
      ElMessage({
        message: '已取消删除',
        type: 'info',
      });
    });
};

const handleEdit = (val: RowItem) => {
  row = val;
  form.name = (row as RowItem).user_name;
  dialogFormVisible.value = true;
};

const changeUser = () => {
  let params = {
    id: (row as RowItem).id,
    user_name: form.name,
    password: CryptoJS.MD5(form.pass).toString(),
  };
  updateUser(params).then(() => {
    ElMessage({
      message: '修改成功',
      type: 'success',
    });
    dialogFormVisible.value = false;
    init();
  });
};

init();

onActivated(() => {
  init();
});
</script>

<style scoped lang="scss">
.frontArea {
  margin-top: 15px;
}
.btn {
  cursor: pointer;
}
.blue {
  color: blue;
}
.red {
  color: red;
}
.download {
  text-align: right;
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.userDialog {
  .el-dialog {
    width: 35%;
  }
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
