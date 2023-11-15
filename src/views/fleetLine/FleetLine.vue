<template>
  <div class="fleetLine">
    <FleetModel :model="state" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import AirData from './airLine';
import FleetModel from './components/FleetModel.vue';

const state = reactive(AirData);
</script>

<style lang="scss" scoped>
.fleetLine {
  @include themify($themes) {
    background-color: themed('background-fleet');
  }
}
</style>
