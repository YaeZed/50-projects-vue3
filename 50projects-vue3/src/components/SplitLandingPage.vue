<template>
  <div
    class="split-container"
    :class="{ 'hover-left': hoverLeft, 'hover-right': hoverRight }"
  >
    <div
      class="split left"
      @mouseenter="hoverLeft = true"
      @mouseleave="hoverLeft = false"
    >
      <h1>Playstation 5</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>

    <div
      class="split right"
      @mouseenter="hoverRight = true"
      @mouseleave="hoverRight = false"
    >
      <h1>Xbox Series X</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 使用响应式变量控制状态，而不是直接操作 DOM classList
// 这种方式更符合 "数据驱动视图" 的理念
const hoverLeft = ref(false);
const hoverRight = ref(false);
</script>

<style scoped>
/* 引入字体建议放在 index.html 或全局 CSS 中，这里放也可以，但尽量只放一次 */
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

/* CSS 变量定义在局部容器上，防止污染全局 */
.split-container {
  --left-bg-color: rgba(87, 84, 236, 0.7);
  --right-bg-color: rgba(43, 43, 43, 0.8);
  --left-btn-hover-color: rgba(87, 84, 236, 1);
  --right-btn-hover-color: rgba(28, 122, 28, 1);
  --hover-width: 75%; /* 稍微增加一点宽度对比度 */
  --other-width: 25%;
  --speed: 1000ms;

  font-family: "Ubuntu", sans-serif;
  position: relative;
  width: 100%;
  height: 100vh; /* 占满视口 */
  background: #333;
  overflow: hidden; /* 防止内容溢出 */
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: width var(--speed) ease-in-out;
}

.split.left {
  left: 0;
  /* 建议检查这里图片的实际路径 */
  background-image: url("/assets/ps.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

/* 优化遮罩层写法，确保遮罩在图片之上，内容之下 */
.split::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transition: background-color var(--speed) ease-in-out;
  z-index: 1; /* 遮罩层层级 */
}

.split.left::before {
  background-color: var(--left-bg-color);
}

.split.right {
  right: 0;
  background-image: url("/assets/xbox.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.split.right::before {
  background-color: var(--right-bg-color);
}

/* 内容层级需要高于遮罩层 */
h1 {
  font-size: 4rem;
  color: #fff; /* 显式设置颜色 */
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2; /* 确保文字在遮罩之上 */
}

.btn {
  position: absolute;
  left: 50%;
  top: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  border: #fff solid 2px;
  width: 15rem;
  padding: 1.5rem;
  transform: translateX(-50%);
  z-index: 2; /* 确保按钮在遮罩之上 */
  transition: all 0.2s ease-in; /* 按钮本身的 hover 效果也可以加个过渡 */
}

.split.left .btn:hover {
  background-color: var(--left-btn-hover-color);
  border-color: var(--left-btn-hover-color);
}

.split.right .btn:hover {
  background-color: var(--right-btn-hover-color);
  border-color: var(--right-btn-hover-color);
}

/* 使用 Vue 动态类名控制的样式 */
.hover-left .left {
  width: var(--hover-width);
}
.hover-left .right {
  width: var(--other-width);
}

.hover-right .left {
  width: var(--other-width);
}
.hover-right .right {
  width: var(--hover-width);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
    top: 30%;
  }
  .btn {
    padding: 1.2rem;
    width: 12rem;
  }
}
</style>
