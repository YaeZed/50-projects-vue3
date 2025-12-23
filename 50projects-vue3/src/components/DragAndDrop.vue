<template>
  <div class="drag-and-drop-body">
    <div class="container">
      <div
        v-for="index in 5"
        :key="index"
        class="empty"
        :class="{ hovered: hoveredIndex === index - 1 }"
        @dragover.prevent
        @dragenter.prevent="dragEnter(index - 1)"
        @dragleave="dragLeave($event)"
        @drop="drop(index - 1)"
      >
        <div
          v-if="index - 1 === currentIndex"
          class="fill"
          draggable="true"
          @dragstart="dragStart($event, index - 1)"
          @dragend="dragEnd"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// start-enter-over.prevent-drop-leave-end

// 状态：当前填充物在哪一个格子（0-4）
const currentIndex = ref(0);
// 状态：当前鼠标悬停在哪一个格子（用于高亮显示）
const hoveredIndex = ref<number | null>(null);

// =========================================
// 核心修复点 1：dragStart 设置
// =========================================
const dragStart = (e: DragEvent, index: number) => {
  if (e.dataTransfer) {
    // 【关键】必须设置 setData，否则浏览器认为此次拖拽无效
    e.dataTransfer.setData("text/plain", String(index));
    // 设置拖拽效果为“移动”
    e.dataTransfer.effectAllowed = "move";
  }

  // 小技巧：使用 setTimeout 将样式修改推迟到下一个事件循环
  // 这样浏览器截取的“拖拽残影(Ghost)”是正常的图片，
  // 而原本留在原地的 DOM 元素才会变成半透明或隐藏
  const target = e.target as HTMLElement;
  setTimeout(() => {
    target.classList.add("hold");
    // 设置为不可见（但由于它占位，所以用 invisible 或者 opacity）
    // 这里用 hold class 控制样式
  }, 0);
};

// =========================================
// 拖拽结束（无论成功失败都会触发）
// =========================================
const dragEnd = (e: DragEvent) => {
  // target精确获取元素，currentTarget获取事件绑定的元素
  const target = e.target as HTMLElement;
  // 移除拖拽中的样式
  target.classList.remove("hold");
  // 清除悬停高亮
  hoveredIndex.value = null;
};

// =========================================
// 进入目标格子
// =========================================
const dragEnter = (index: number) => {
  // 如果进入的不是当前它自己所在的格子，则高亮
  if (index !== currentIndex.value) {
    hoveredIndex.value = index;
  }
};

// =========================================
// 离开目标格子
// =========================================
const dragLeave = (e: DragEvent) => {
  // 这里其实不需要复杂的逻辑，因为 dragEnter 会更新 hoveredIndex
  // 但为了防止闪烁，我们可以不做清空，只在 drop 或 end 时清空
  // 仅作演示：如果确实需要离开清除，可以判断 relatedTarget
};

// =========================================
// 核心修复点 2：放置 (Drop)
// =========================================
const drop = (index: number) => {
  // 更新位置
  currentIndex.value = index;
  // 清除高亮状态
  hoveredIndex.value = null;
};
</script>

<style scoped>
.drag-and-drop-body {
  height: 100vh;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: row;
}

.empty {
  width: 150px;
  height: 150px;
  background-color: white;
  margin: 10px;
  border: solid 3px black;
  box-sizing: border-box; /* 确保边框不撑大盒子 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease; /* 添加一点动画更流畅 */
}

/* 悬停时的样式 */
.hovered {
  background-color: #333;
  border-style: dashed;
  border-color: #ccc;
}

.fill {
  /* 确保图片路径正确，如果不正确请检查 public/assets 文件夹 */
  background-image: url("/assets/McLarenSnow.PNG");
  width: 140px; /* 稍微留一点缝隙，防止填太满导致误触父级边缘 */
  height: 140px;
  background-size: cover;
  background-position: center;
  cursor: grab;
  /* 加上背景色，防止图片加载失败时完全看不到东西 */
  background-color: red;
}

/* 拖拽过程中，原位置的样式 */
.hold {
  opacity: 0.2; /* 变淡，表示正在被拿走 */
  cursor: grabbing;
}
</style>
