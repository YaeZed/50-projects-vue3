<template>
  <div class="demo-wrapper">
    <nav :class="{ active: isOpen }">
      <ul>
        <li v-for="item in navItems" :key="item.text">
          <a href="#" @click.prevent>{{ item.text }}</a>
        </li>
      </ul>

      <button
        class="icon-btn"
        @click="isOpen = !isOpen"
        aria-label="Toggle Navigation"
      >
        <div class="line line1"></div>
        <div class="line line2"></div>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 数据驱动，方便维护
const navItems = [
  { text: "Home" },
  { text: "Works" },
  { text: "About" },
  { text: "Contact" },
];

const isOpen = ref(true);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli");

/* 将组件样式与页面布局样式分离 
  demo-wrapper 模拟页面背景，实际组件中不应该包含这些
*/
.demo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-image: linear-gradient(
    to bottom,
    #eafbff 0%,
    #c9e1ff 50%,
    #5290f9 75%,
    #5290f9 100%
  );
  font-family: "Muli", sans-serif;
}

nav {
  background-color: #fff;
  padding: 20px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: width 0.6s linear;
  overflow: hidden; /* 防止内容溢出 */

  /* 关键优化：添加视距，让子元素的 rotateY 产生真实的 3D 效果 */
  perspective: 1000px;
}

nav.active {
  width: 350px;
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 0;
  transition: width 0.6s linear;

  /* 保持内容不换行，防止宽度变小时布局错乱 */
  white-space: nowrap;
}

nav.active ul {
  width: 100%;
}

nav ul li {
  transform: rotateY(0deg);
  opacity: 0;
  /* 初始状态稍微往后一点，增加进场动感 */
  transform: rotateY(100deg);
  transition: transform 0.6s linear, opacity 0.6s linear;
  margin: 0 10px;
}

nav.active ul li {
  opacity: 1;
  transform: rotateY(0deg); /* 回正 */
}

nav ul li a {
  color: #000;
  text-decoration: none;
}

.icon-btn {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  height: 30px;
  width: 30px;
  /* 确保按钮不会被压缩 */
  flex-shrink: 0;
}

.icon-btn:focus {
  outline: none;
}

.line {
  background-color: #5290f9;
  height: 2px;
  width: 20px;
  position: absolute;
  top: 10px;
  left: 5px;
  transition: transform 0.6s linear;
}

.line.line2 {
  top: auto;
  bottom: 10px;
}

/* 按钮旋转动画 */
nav.active .line1 {
  transform: rotate(-765deg) translateY(5.5px);
}

nav.active .line2 {
  transform: rotate(765deg) translateY(-5.5px);
}
</style>
