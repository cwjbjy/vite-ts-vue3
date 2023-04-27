<template>
  <section>
    <el-card shadow="hover">
      <strong>点击按钮，鼠标移动到弹框头部"拖拽弹框"处，可实现拖拽功能。</strong>
      <div class="frontArea">
        <el-button type="primary" @click="dialogVisible = true">点我弹框</el-button>
      </div>
      <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
        <span>我是一个可以拖拽的对话框！</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const dialogVisible = ref(false);
</script>

<style lang="scss" scoped>
.frontArea {
  margin-top: 15px;
}
</style>
