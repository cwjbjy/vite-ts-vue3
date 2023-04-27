<template>
  <section>
    <el-card shadow="hover">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" :disabled="connectFlag" @click="connect">连接</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="closeFlag" @click="close">关闭</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="explainDialog = true">使用说明</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">查看效果图</el-button>
        </el-form-item>
      </el-form>
      <div class="chat">
        <div ref="infoListContent" class="chat-content">
          <div>
            <dl
              v-for="(item, index) in historyInfos"
              :key="index"
              :class="[item.name == user_name ? 'info-right' : 'info-left']"
            >
              <dt>
                <img v-if="item.image" :src="item.image" class="headPortrait" alt="图片加载失败" />
                <img v-else src="@/assets/images/chartRoom/root.png" class="headPortrait" />
              </dt>
              <dd>
                <div class="txt-name">{{ item.name }}</div>
                <div>
                  <span class="txt-content">{{ item.text }}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div class="chart-button">
          <el-input v-model="msg" placeholder="请输入" center>
            <template #append>
              <el-button type="primary" @click="send">发送</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-card>
    <el-dialog v-model="explainDialog" title="使用说明" center>
      <div class="describle">
        <ul>
          <li>1.点击连接；</li>
          <li>2.使用另一个浏览器，登录另一个账户，点击连接；或者使用另一台电脑登录另一个账户</li>
          <li>3.输入消息，点击发送或者回车发送；</li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="效果图" center width="90%" top="2vh">
      <img src="@/assets/images/chartRoom/chatShowV2.0.png" alt="加载失败" />
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref, onActivated, nextTick, onDeactivated } from 'vue';

import { bus } from '@/settings';
import insService from '@/utils/ws';
import { useUserStore } from '@/store/user';
import type { ChatInfo } from '#/config';

const userStore = useUserStore();
const { user_name, imageUrl } = storeToRefs(userStore);
const msg = ref('');
const connectFlag = ref(false);
const closeFlag = ref(true);
const dialogVisible = ref(false);
const explainDialog = ref(false);
const historyInfos = ref<ChatInfo[]>([]);
const infoListContent = ref<HTMLDivElement | null>(null);
const closeCallBack = () => {
  historyInfos.value = [];
};

const connect = () => {
  let user = {
    type: 'setName',
    name: user_name.value,
    image: imageUrl.value,
  };
  insService.joinMeeting({
    params: user,
    closeCallBack,
  });
  connectFlag.value = true;
  closeFlag.value = false;
};

const close = () => {
  let close = {
    type: 'close',
  };
  insService.close(close);
  connectFlag.value = false;
  closeFlag.value = true;
};

const send = () => {
  if (!connectFlag.value) {
    ElMessage({
      message: '请先连接',
      type: 'error',
    });
  }
  if (msg.value == '') return;
  let message = {
    type: 'chat',
    text: msg.value,
  };
  insService.sendMessage(message);
  msg.value = '';
};

const keyDown = (e: KeyboardEvent) => {
  let key = e.key;
  if (key === 'Enter') {
    send();
  }
};

onActivated(() => {
  document.addEventListener('keydown', keyDown);
  window.eventBus.$on(bus.updateWs, async (value: ChatInfo) => {
    historyInfos.value.push(value);
    await nextTick();
    if (infoListContent.value) infoListContent.value.scrollTop = 9999999;
  });
});

onDeactivated(() => {
  window.eventBus.$off(bus.updateWs);
  document.removeEventListener('keydown', keyDown);
});
</script>

<style lang="scss" scoped>
.describle {
  margin: 15px 0;
}
.chat {
  border: 1px solid #000;
  box-sizing: border-box;
  width: 353px;
  height: 540px;
  position: relative;
}
.chat-content {
  height: 480px;
  overflow-y: auto;
  padding: 10px;
  .txt-name {
    margin-bottom: 10px;
  }
  .txt-content {
    word-break: break-all;
    background-color: #0083ff;
    border-radius: 3px;
    padding: 5px 12px;
    color: #fff;
  }
  .info-right {
    text-align: right;
    padding-right: 47px;
    dt {
      right: 0;
      @extend %main_centerRight;
    }
  }
  .info-left {
    text-align: left;
    padding-left: 47px;
    dt {
      left: 0;
      @extend %main_centerLeft;
    }
  }
  dl {
    position: relative;
    margin-bottom: 20px;
    dt {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
    }
  }
}
.headPortrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
img {
  width: 100%;
}
</style>

<style lang="scss">
.chart-button {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.chatDialog {
  .el-dialog__body {
    height: 76vh;
    overflow: auto;
  }
}
.el-input-group__append {
  border-left: 0;
  border-radius: 0;
}
</style>
