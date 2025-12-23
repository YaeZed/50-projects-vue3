<template>
  <Transition name="fade">
    <div v-if="isLoading" class="ring-body">
      <div class="ring-container">
        <div
          v-for="n in 13"
          :key="n"
          class="dot-wrapper"
          :style="{ '--i': n - 1 }"
        >
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// --- 状态管理 ---

// 控制加载是否显示的响应式变量，默认为 true（显示）
const isLoading = ref(true);

// 模拟延迟的时间（毫秒），例如 3秒
const SIMULATED_DELAY_MS = 3000;

// --- 生命周期 ---

onMounted(() => {
  // 组件挂载到页面后，启动定时器
  setTimeout(() => {
    // 延迟时间结束，将 isLoading 设置为 false，触发淡出过渡
    isLoading.value = true;

    // 【可选】如果需要通知父组件加载已完成，可以在这里触发事件
    // emit('loading-finished');
  }, SIMULATED_DELAY_MS);
});
</script>

<style scoped>
/* --- 原有样式保持不变 --- */
.ring-body {
  /* 注意：这里使用了 fixed 定位，确保加载层覆盖整个屏幕，
    并且不受父元素溢出隐藏的影响。
  */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保在最上层 */
}

.ring-container {
  position: relative;
  width: 30px;
  height: 30px;
}

.dot-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  /* 围成一圈 */
  transform: rotate(calc(var(--i) * 27.69deg));
}

.dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: #fff;
  border-radius: 50%;
  top: -1.5px;
  left: -1.5px;
  transform: translateY(10px);
  opacity: 0.2;
  box-shadow: none;
  animation: passing-glow 1.3s linear infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes passing-glow {
  0%,
  15% {
    opacity: 1;
    transform: translateY(10px) scale(1.4);
    /* 光圈效果，组合阴影 */
    box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.8),
      0 0 12px 2px rgba(255, 255, 255, 0.5);
  }
  30%,
  100% {
    opacity: 0.2;
    transform: translateY(10px) scale(1);
    box-shadow: none;
  }
}

/* --- 新增：Vue Transition 过渡样式 --- */

/* .fade-leave-active: 定义离开过渡生效时的状态。
  在这里我们定义过渡属性为 opacity，持续时间 0.8秒，缓动函数 ease。
*/
.fade-leave-active {
  transition: opacity 0.8s ease;
}

/* .fade-leave-to: 定义离开过渡结束时的状态（目标状态）。
  我们希望它变为完全透明。
*/
.fade-leave-to {
  opacity: 0;
}

/* (可选) 如果你希望将来它再次出现时也有淡入效果，可以加上这两段：
  .fade-enter-active { transition: opacity 0.8s ease; }
  .fade-enter-from { opacity: 0; }
*/
</style>
