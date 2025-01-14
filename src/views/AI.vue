<!-- eslint-disable vue/no-v-html -->
<template>
  <section>
    <el-card shadow="hover">
      <div class="chat">
        <div ref="infoListContent" class="chat-content">
          <div>
            <dl
              v-for="(item, index) in messageList"
              :key="index"
              :class="[item.name == userName ? 'info-right' : 'info-left']"
            >
              <dt>
                <img v-if="item.image" :src="item.image" class="headPortrait" alt="图片加载失败" />
                <img v-else src="@/assets/images/chartRoom/root.png" class="headPortrait" />
              </dt>
              <dd>
                <div class="txt-name">{{ item.name }}</div>
                <div>
                  <span class="txt-content" v-html="renderMessageContent(item.text)"></span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div class="chart-button">
          <el-input v-model="msg" placeholder="请输入">
            <template #append>
              <el-button v-if="!loading" type="primary" @click="send">发送</el-button>
              <el-button v-else type="primary" @click="cancel">取消 </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ref, onActivated, nextTick, onDeactivated } from 'vue';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { ElMessage } from 'element-plus';
import hljs from 'highlight.js';
import { isEmpty } from 'lodash-es';
import markdownit from 'markdown-it';
import { storeToRefs } from 'pinia';

import type { ChatInfo } from '#/config';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { userName, imageUrl } = storeToRefs(userStore);
const msg = ref('');
const answer = ref('');
const loading = ref(false);
const ctrl = ref<AbortController>();
const messageList = ref<ChatInfo[]>([]);
const historyInfos = ref<{ content: string; role: string }[]>([]);
const infoListContent = ref<HTMLDivElement | null>(null);
const max = -3; //上下文消息数量

const md = markdownit({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {
        /* empty */
      }
    }

    return ''; // 如果未指定语言，则返回原始代码
  },
});

// 渲染消息内容（支持 Markdown 和普通文本）
const renderMessageContent = (content: any) => {
  return md.render(content);
};

const reset = () => {
  loading.value = false;
  historyInfos.value.push({ content: answer.value, role: 'assistant' });
  answer.value = '';
};

const send = async () => {
  historyInfos.value.push({ content: msg.value, role: 'user' });
  historyInfos.value = historyInfos.value.slice(max);
  messageList.value.push({ name: userName.value, text: msg.value, image: imageUrl.value });
  msg.value = '';

  ctrl.value = new AbortController(); // 创建AbortController实例，以便中止请求
  await fetchEventSource(import.meta.env.VITE_APP_OPENAI, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: historyInfos.value,
      stream: true,
      temperature: 0.7, //严谨与想象
      top_p: 1,
    }),
    openWhenHidden: true, // 取消visibilityChange事件
    signal: ctrl.value.signal, // AbortSignal
    async onmessage(ev) {
      try {
        const data = JSON.parse(ev.data);
        if (!isEmpty(data.choices) && !isEmpty(data.choices[0].delta)) {
          const content = data.choices[0].delta.content;
          answer.value += content;
          if (!loading.value) {
            loading.value = true;
            messageList.value.push({ name: '智能助手', text: answer.value });
          } else {
            messageList.value[messageList.value.length - 1].text = answer.value;
          }
          await nextTick();
          if (infoListContent.value) infoListContent.value.scrollTop = 9999999;
        }
      } catch {
        reset();
      }
    },
    onclose() {},
    onerror(err) {
      console.error(err);
      ElMessage.error('对话请求发生网络错误或费用不足');
      ctrl.value?.abort();
      throw err; // 直接抛出错误，避免反复调用
    },
  });
};

const cancel = () => {
  ctrl.value?.abort();
  reset();
};

const keyDown = (e: KeyboardEvent) => {
  let key = e.key;
  if (key === 'Enter') {
    send();
  }
};

onActivated(() => {
  document.addEventListener('keydown', keyDown);
});

onDeactivated(() => {
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
  height: calc(100vh - 162px);
  position: relative;
}
.chat-content {
  height: calc(100vh - 216px);
  overflow-y: auto;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #cfcfcf;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }
  .txt-name {
    margin-bottom: 4px;
  }
  .txt-content {
    word-break: break-all;
    display: block;
    padding: 5px 12px;
    color: #141414;
    line-height: 20px;
    background-color: #a8a29e1a;
  }
  .info-right {
    text-align: right;
    padding-right: 47px;
    margin-left: 47px;
    dt {
      right: 0;
      @extend %main_centerRight;
    }
  }
  .info-left {
    text-align: left;
    padding-left: 47px;
    margin-right: 47px;
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
