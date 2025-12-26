<template>
  <div class="toast-notification-body">
    <button @click="addToast">Show Notification</button>

    <Teleport to="body">
      <div class="toasts-container">
        <TransitionGroup name="toast">
          <div
            class="toast"
            :style="{ color: toast.color }"
            v-for="toast in toasts"
            :key="toast.id"
          >
            <p>{{ toast.message }}</p>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Toast {
  id: number; // 新增唯一 ID
  message: string;
  color: string;
}

const toasts = ref<Toast[]>([]);

const messages: string[] = [
  "Hello, World!",
  "How are you today?",
  "What's up?",
  "Nice to see you!",
];
const colors: string[] = ["#4caf50", "#2196f3", "#f44336", "#9c27b0"];

const addToast = () => {
  // 优化1: 使用局部变量，无需 ref
  const msg = messages[Math.floor(Math.random() * messages.length)]!;
  const color = colors[Math.floor(Math.random() * colors.length)]!;
  const id = Date.now() + Math.random(); // 生成唯一 ID

  const newToast: Toast = { id, message: msg, color };

  toasts.value.push(newToast);

  // 优化2: 根据 ID 精准删除
  setTimeout(() => {
    removeToast(id);
  }, 3000);
};

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
};
</script>

<style scoped>
/* 字体引入建议移至全局样式，此处保留演示用 */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.toast-notification-body {
  font-family: "Roboto", sans-serif;
  height: 100vh;
  background-color: rebeccapurple;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 防止 body 滚动 */
  overflow: hidden;
}

button {
  padding: 15px;
  font-family: inherit;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: transform 0.1s ease-in-out; /* 使用 transform 性能更好 */
  background-color: #fff;
  color: rebeccapurple;
}

button:active {
  transform: scale(0.95);
}

.toasts-container {
  position: fixed; /* 使用 fixed 确保相对于视口定位 */
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999; /* 确保在最上层 */
}

.toast {
  background-color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  margin: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* 简单的 Vue Transition 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
