<template>
  <div class="random-choices-body">
    <div class="container">
      <h3>
        Enter all of the choices divided by a comma(,).
        <br />
        Press enter when you are done.
      </h3>

      <textarea
        ref="textareaRef"
        placeholder="Enter choices here..."
        v-model="input"
        :disabled="isPicking"
        @keydown.enter.prevent="startRandomPick"
      ></textarea>

      <div class="tags">
        <span
          class="tag"
          :class="{ highlight: index === activeIndex }"
          v-for="(tag, index) in tags"
          :key="tag + index"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";

// 给 input 一个初始值，这样 tags 也会自动有值
const input = ref("choice1, choice2, choice3");
const textareaRef = ref<HTMLTextAreaElement>();

// 状态控制
const activeIndex = ref<number>(-1);
const isPicking = ref(false); // 锁：是否正在抽奖中

// 优化 4: 使用 computed 自动生成 tags
// 逻辑：分割 -> 去除两端空格 -> 过滤空字符串
const tags = computed(() => {
  return input.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
});

// 获取随机索引的工具函数
const getRandomIndex = () => {
  return Math.floor(Math.random() * tags.value.length);
};

const startRandomPick = () => {
  // 重置activeIndex
  activeIndex.value = -1;
  // 边界检查：如果正在抽奖，或者没有标签，直接返回
  if (isPicking.value || tags.value.length === 0) return;

  isPicking.value = true;
  const intervalTime = 100; // 稍微调慢一点点，视觉效果更清晰

  // 启动循环闪烁
  const interval = setInterval(() => {
    activeIndex.value = getRandomIndex();
  }, intervalTime);

  // 3秒后停止
  setTimeout(() => {
    clearInterval(interval);

    // 这里的逻辑稍微调整了一下，直接定格在最后一次随机结果，或者再选一次作为最终结果
    // 为了平滑，我们再进行最后一次确定的选择
    setTimeout(() => {
      activeIndex.value = getRandomIndex();
      isPicking.value = false; // 解锁

      // 抽完奖后重新聚焦输入框
      nextTick(() => {
        textareaRef.value?.focus();
      });
    }, 100);
  }, 3000);
};

onMounted(() => {
  textareaRef.value?.focus();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.random-choices-body {
  font-family: "Ubuntu", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #739bd7;
}

.container {
  width: 600px;
  color: white;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  font-family: inherit;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  resize: none; /* 禁止用户拖动改变大小 */
  box-sizing: border-box; /* 确保 padding 不会撑破宽度 */
}

textarea:focus {
  outline: none;
}

/* 抽奖时禁用样式 */
textarea:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.tags {
  display: flex; /* 使用 flex 布局让标签更好排版 */
  flex-wrap: wrap;
  gap: 10px; /* 标签之间的间距 */
  margin-top: 20px;
}

.tag {
  background-color: #3c7b78;
  border-radius: 20px;
  padding: 10px 20px;
  transition: all 0.1s ease-in; /* 添加一点过渡动画 */
}

.tag.highlight {
  background-color: #f5a623;
  transform: scale(1.1); /* 高亮时稍微放大，视觉效果更好 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
