<template>
  <div class="auto-text-effect-body">
    <h1>{{ loadingText }}</h1>

    <div class="input">
      <label for="speed">Speed:</label>
      <input
        id="speed"
        type="number"
        :value="speed"
        min="1"
        max="10"
        step="1"
        @input="updateSpeed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 1. 静态文本不需要响应式
const text = "Loading...";
const speed = ref(1);
// 2. 使用 const 定义 ref
const loadingText = ref("");

let idx = 1;
let timer: ReturnType<typeof setTimeout> | null = null;

const typeText = () => {
  // 3. 这里的切片逻辑：从 0 到 idx
  loadingText.value = text.slice(0, idx);
  idx++;

  // 如果打完了，重置 idx
  if (idx > text.length) {
    idx = 1;
  }

  // 4. 清除旧的 timer (虽然递归不需要清除上一个，但为了保险和逻辑清晰)
  if (timer) clearTimeout(timer);

  // 5. 设置新的 timer
  timer = setTimeout(typeText, 300 / speed.value);
};

// 单独提取更新速度的方法，代码更清晰
const updateSpeed = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value);
  // 简单做个边界防护
  if (val >= 1 && val <= 10) {
    speed.value = val;
  }
};

// 6. 生命周期管理
onMounted(() => {
  typeText();
});

// 7. 关键：组件销毁时停止递归，防止内存泄漏
onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.auto-text-effect-body {
  /* 如果作为组件嵌入，建议用 100% 而不是 100vh/vw，除非这是根页面 */
  height: 100vh;
  width: 100vw;
  background-color: darksalmon;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  /* 固定高度，防止文字没出来时高度塌陷 */
  min-height: 40px;
}

.input {
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 10px;
}

.input input {
  border: none;
  background-color: darksalmon;
  width: 60px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  border-radius: 4px;
}

.input input:focus {
  outline: 2px solid #333; /* 增加聚焦时的提示 */
}
</style>
