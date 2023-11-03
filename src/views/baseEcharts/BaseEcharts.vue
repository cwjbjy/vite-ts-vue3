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
import BarModel from './components/BarModel.vue';
import PieModel from './components/PieModel.vue';
import ScatterModel from './components/ScatterModel.vue';
import PictorialBarModel from './components/PictorialBarModel.vue';
import LineModel from './components/LineModel.vue';
import CylinderModel from './components/CylinderModel.vue';
</script>

<style scoped>
.echarts-box {
  padding: 10px;
}
</style>
