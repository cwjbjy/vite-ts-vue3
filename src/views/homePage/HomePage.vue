<template>
  <section class="firstItem">
    <el-row>
      <el-col :span="8" :lg="8" :xl="6">
        <UserInfo />
        <Language />
      </el-col>
      <el-col :span="16" :lg="16" :xl="18">
        <IconArea />
        <el-row style="padding: 0 10px; margin-bottom: 20px">
          <Schedule />
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="12" class="content">
        <el-card shadow="hover">
          <BarLineModel />
        </el-card>
      </el-col>
      <el-col :span="12" class="content">
        <el-card shadow="hover">
          <RadarModel />
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
import BarLineModel from './components/BarLineModel.vue';
import IconArea from './components/IconArea.vue';
import Language from './components/Language.vue';
import RadarModel from './components/RadarModel.vue';
import Schedule from './components/Schedule.vue';
import UserInfo from './components/UserInfo.vue';
</script>

<style scoped lang="scss">
.firstItem {
  padding: 10px 0 0 10px;
  .content {
    padding: 0 10px;
  }
}
</style>
