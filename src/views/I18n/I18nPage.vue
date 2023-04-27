<template>
  <section>
    <el-card shadow="hover">
      <div class="container">
        <div class="frontArea">
          <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'zh' ? 'en' : 'zh'">{{
            $t('i18n.btn')
          }}</el-button>
        </div>
        <div class="frontArea">
          <strong>{{ $t('i18n.title') }}</strong>
        </div>
        <div class="frontArea">
          <em>{{ $t('i18n.title1') }}</em>
        </div>
        <p>{{ $t('i18n.p1') }}</p>
        <p>{{ $t('i18n.p2') }}</p>
        <p>{{ $t('i18n.p3') }}</p>
        <p>{{ $t('i18n.p4') }}</p>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.frontArea {
  margin-top: 15px;
}
</style>
