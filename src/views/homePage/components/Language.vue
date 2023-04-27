<template>
  <el-card shadow="hover" class="user">
    <template #header>
      <div class="clearfix">
        <span>语言详情</span>
      </div>
    </template>
    Vue
    <el-progress :percentage="98" color="#42b983" :format="format"></el-progress>
    React
    <el-progress :percentage="97" :format="format"></el-progress>
    Uni-app
    <el-progress :percentage="89" color="#f1e05a" :format="format"></el-progress>
    Nuxt
    <el-progress :percentage="87" color="#f56c6c" :format="format"></el-progress>
  </el-card>
</template>

<script setup lang="ts">
const format = (percentage: number) => {
  if (percentage >= 90) {
    return '精通';
  } else if (percentage >= 80) {
    return '熟练';
  } else if (percentage >= 70) {
    return '一般';
  } else {
    return '了解';
  }
};
</script>

<style scoped>
.user {
  height: 252px;
  display: block;
  margin: 0 10px 20px 10px;
}
</style>
