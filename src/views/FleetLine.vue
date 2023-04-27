<template>
  <div class="fleetLine">
    <FleetModel :model="state" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import FleetModel from '@/components/FleetModel.vue';

import AirData from '@/settings/airLine';

const state = reactive(AirData);
</script>

<style lang="scss" scoped>
.fleetLine {
  @include themify($themes) {
    background-color: themed('background-fleet');
  }
}
</style>
