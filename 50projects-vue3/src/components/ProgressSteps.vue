<template>
  <div class="progress-steps-body">
    <div class="progress-container">
      <div class="progress" :style="{ width: progressWidth }"></div>
      <div
        v-for="(circle, index) in circles"
        :key="index"
        :class="{ active: index < currentActive }"
        class="circle"
      >
        {{ circle }}
      </div>
    </div>

    <button
      class="btn"
      id="prev"
      @click="updateStep('prev')"
      :disabled="currentActive === 1"
    >
      Prev
    </button>
    <button
      class="btn"
      id="next"
      @click="updateStep('next')"
      :disabled="currentActive === circles.length"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const circles = ref<number[]>([1, 2, 3, 4]);

// 记录状态
const currentActive = ref<number>(1);

// 计算进度条宽度
const progressWidth = computed(() => {
  return ((currentActive.value - 1) / (circles.value.length - 1)) * 100 + "%";
});

// 更新方法
const updateStep = (direction: "next" | "prev") => {
  if (direction === "next") {
    if (currentActive.value < circles.value.length) {
      currentActive.value++;
    }
  } else {
    if (currentActive.value > 1) {
      currentActive.value--;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");

:global(body) {
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
}
:root {
  --line-empty: #e0e0e0;
  --line-full: #3498db;
}
</style>

<style scoped>
.progress-steps-body {
  background-color: #fff;
  font-family: "Muli", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.progress-container {
  display: flex;
  flex-direction: row;
  width: 350px;
  position: relative;
  margin-bottom: 30px;
  justify-content: space-between;
  z-index: 1;
}

.progress-container::before {
  content: "";
  background-color: var(--line-empty);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 100%;
  z-index: -1;
}

.progress {
  background-color: var(--line-full);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
}

.circle {
  background-color: #fff;
  color: #999;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--line-empty);
  transition: 0.4s ease;
}

.circle.active {
  border-color: var(--line-full);
}

.btn {
  background-color: var(--line-full);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Muli", sans-serif;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
}

.btn:active {
  transform: scale(0.7);
  transition: 0.1s ease-in-out;
}

.btn:focus {
  outline: 0;
}

.btn:disabled {
  background-color: var(--line-empty);
  cursor: not-allowed;
  transform: none;
}
</style>
