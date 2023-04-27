<template>
  <section>
    <el-card shadow="hover">
      <strong>点击按钮，进行pdf预览，具有放大、缩小、下载、打印功能</strong>
      <div class="frontArea">
        <el-button type="primary" @click="dialogFormVisible = true">点我弹框</el-button>
      </div>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="pdf预览" width="90%" top="2vh">
      <iframe src="/static/cwj.pdf" frameborder="0" class="pdf"></iframe>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const dialogFormVisible = ref(false);
</script>

<style lang="scss" scoped>
.frontArea {
  margin-top: 15px;
}
.pdf {
  width: 100%;
  height: calc(100vh - 170px - 2vh);
}
</style>
