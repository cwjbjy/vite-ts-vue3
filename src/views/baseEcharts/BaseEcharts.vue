<template>
  <section>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <BarModel />
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <PieModel />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <ScatterModel />
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <PictorialBarModel />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <LineModel />
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <CylinderModel />
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
import.meta.glob('./components/*.vue');
</script>

<style scoped>
.echarts-box {
  padding: 10px;
}
</style>
