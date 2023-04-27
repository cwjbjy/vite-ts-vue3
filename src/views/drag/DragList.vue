<template>
  <section>
    <el-card shadow="hover">
      <strong>可通过拖拽进行分组与排序;暂不支持IE</strong>
      <div class="drag-box frontArea">
        <div class="drag-box-item">
          <div class="item-title">todo</div>
          <draggable
            v-model="state.todo"
            group="sortlist"
            ghost-class="ghost-style"
            item-key="index"
            data-id="todo"
            :component-data="{ name: 'fade' }"
            @remove="removeHandle"
          >
            <template #item="{ element }">
              <div class="drag-list pointer">{{ element.content }}</div>
            </template>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">doing</div>
          <draggable
            v-model="state.doing"
            group="sortlist"
            ghost-class="ghost-style"
            item-key="index"
            data-id="doing"
            :component-data="{ name: 'fade' }"
            @remove="removeHandle"
          >
            <template #item="{ element }">
              <div class="drag-list pointer">{{ element.content }}</div>
            </template>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">done</div>
          <draggable
            v-model="state.done"
            group="sortlist"
            ghost-class="ghost-style"
            item-key="index"
            data-id="done"
            :component-data="{ name: 'fade' }"
            @remove="removeHandle"
          >
            <template #item="{ element }">
              <div class="drag-list pointer">{{ element.content }}</div>
            </template>
          </draggable>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import draggable from 'vuedraggable';
const state = reactive({
  todo: [
    {
      id: 1,
      content: '开发图表组件',
    },
    {
      id: 2,
      content: '开发拖拽组件',
    },
    {
      id: 3,
      content: '开发权限测试组件',
    },
  ],
  doing: [
    {
      id: 1,
      content: '开发登录注册页面',
    },
    {
      id: 2,
      content: '开发头部组件',
    },
    {
      id: 3,
      content: '开发表格相关组件',
    },
    {
      id: 4,
      content: '开发表单相关组件',
    },
  ],
  done: [
    {
      id: 1,
      content: '初始化项目，生成工程目录，完成相关配置',
    },
    {
      id: 2,
      content: '开发项目整体框架',
    },
  ],
});

document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
};

const removeHandle = (event: any) => {
  ElMessage({
    message: `从 ${event.from.dataset.id} 移动到 ${event.to.dataset.id} `,
    type: 'success',
  });
};
</script>

<style scoped lang="scss">
.frontArea {
  margin-top: 15px;
}
.drag-box {
  display: flex;
  &-item {
    flex: 1;
    // min-width: 300px;
    margin-right: 16px;
    border-radius: 6px;
    &:last-of-type {
      margin-right: 0;
    }
    @include themify($themes) {
      background-color: themed('background-drag');
      border: 1px solid themed('card-border');
    }
  }
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
}
.drag-box-item {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.drag-box-item::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  border: 1px solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  border-radius: 6px;
  @include themify($themes) {
    background: themed('card-background');
  }
}
.drag-list:hover {
  @include themify($themes) {
    border: 1px solid themed('card-border-active');
  }
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
</style>
