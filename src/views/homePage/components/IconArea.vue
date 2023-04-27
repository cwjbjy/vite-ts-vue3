<template>
  <el-row class="icon-area" style="margin-bottom: 20px">
    <el-col :span="8" class="icon-box">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="icon-content">
          <el-icon class="grid-con-icon grid-con-1"><User /></el-icon>
          <div class="icon-info">
            <div class="grid-num number1">1234</div>
            <div>用户访问量</div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="icon-box">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="icon-content">
          <el-icon class="grid-con-icon grid-con-2"><Bell /></el-icon>
          <div class="icon-info">
            <div class="grid-num number1">234</div>
            <div>系统消息</div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="icon-box">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="icon-content">
          <el-icon class="grid-con-icon grid-con-3"><MessageBox /></el-icon>
          <div class="icon-info">
            <div class="grid-num number3">20</div>
            <div>数量</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.icon-area {
  height: 100px;
  .icon-box {
    padding-left: 10px;
    padding-right: 10px;
    .icon-content {
      display: flex;
    }
    .icon-info {
      flex: 1;
      text-align: center;
      @extend %column_center;
      .grid-num {
        font-size: 30px;
        font-weight: bold;
      }
      .number1 {
        color: rgb(45, 140, 240);
      }
      .number2 {
        color: rgb(100, 213, 114);
      }
      .number3 {
        color: rgb(242, 94, 67);
      }
    }
  }
  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
  .grid-con-1 {
    background: rgb(45, 140, 240);
  }
  .grid-con-2 {
    background: rgb(100, 213, 114);
  }
  .grid-con-3 {
    background: rgb(242, 94, 67);
  }
}
</style>
