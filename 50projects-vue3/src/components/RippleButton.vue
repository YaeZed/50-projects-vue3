<template>
  <div class="ripple-button-body">
    <button class="ripple" @click="handleClick">click</button>
  </div>
</template>

<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  // 1. 修复：使用 currentTarget 确保获取的是 button 元素，而不是其子元素
  const btn = event.currentTarget as HTMLButtonElement;

  // 2. 修复：使用 getBoundingClientRect 获取更精准的视口坐标
  const rect = btn.getBoundingClientRect();

  // 计算点击位置相对于按钮左上角的坐标
  const xInside = event.clientX - rect.left;
  const yInside = event.clientY - rect.top;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.left = `${xInside}px`;
  circle.style.top = `${yInside}px`;

  btn.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 500);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.ripple-button-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.ripple {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  /* 3. 修复：防止涟漪溢效果出按钮边界 */
  overflow: hidden;
}

/* 4. 修复：使用 :deep() 让动态创建的元素也能吃到样式 */
:deep(.circle) {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7); /* 稍微加点透明度更好看 */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-in-out;
  pointer-events: none; /* 防止涟漪效果遮挡按钮点击 */
}

@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>
