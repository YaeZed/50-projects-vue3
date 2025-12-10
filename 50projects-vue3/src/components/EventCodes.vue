<template>
  <div class="event-code-body">
    <div class="container">
      <div v-if="!code" class="code-hint">
        Press any key to see the event code
      </div>

      <div v-else class="codes">
        <div class="code-card">
          {{ code.eventKey }}

          <small>event.key</small>
        </div>
        <div class="code-card">
          {{ code.eventCode }}
          <small>event.code</small>
        </div>
        <div class="code-card">
          {{ code.eventKeyCode }}
          <small>event.keyCode</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 定义清晰的接口
interface KeyInfo {
  eventKey: string;
  eventCode: string;
  eventKeyCode: number;
}

const code = ref<KeyInfo | null>(null);

// 事件处理函数提取出来，方便移除
const handleKeyDown = (event: KeyboardEvent) => {
  console.log(event);

  // 可以在这里加 preventDefault 防止某些按键触发浏览器默认行为（如 F12, F5 等，视需求而定）
  // event.preventDefault();

  code.value = {
    eventKey: event.key === " " ? "Space" : event.key, // 优化：空格键显示为文本 "Space" 否则是空的看不见
    eventCode: event.code, // 这里对应 event.code
    eventKeyCode: event.keyCode,
  };
};

// 生命周期管理
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.event-code-body {
  font-family: "Ubuntu", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9; /* 加个背景色稍微好看点 */
  margin: 0;
}

.codes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

/* 给提示文字单独的样式 */
.code-hint {
  font-size: 24px;
  font-weight: bold;
  color: #555;
  padding: 20px;
  border: 2px dashed #ccc;
}

.code-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* 改为白色背景更干净 */
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  border-radius: 8px; /* 加一点圆角 */
}

small {
  position: absolute;
  top: -25px;
  font-size: 14px;
  color: #666;
}
</style>
