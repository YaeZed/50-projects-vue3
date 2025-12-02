<template>
  <div class="scroll-animation-body">
    <h2>Scroll to see the animation</h2>
    <div
      v-for="(box, index) in boxes"
      :class="box.class"
      :key="index"
      :ref="(el)=>boxElements[index] = el as HTMLElement"
    >
      <h2>{{ box.content }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Box {
  class: string;
  content: string;
}

const boxes: Box[] = [];

for (let i = 0; i < 10; i++) {
  boxes.push({
    class: "box",
    content: "content",
  });
}
// 1. 使用 ref 替代 document.querySelectorAll
/**
 * 为什么要改？
 * 如果你的页面里有两个这样的组件，或者其他组件里也有 .box 这个类名，原本的 querySelectorAll 会把它们全部抓取过来一起操作，导致动画错乱。现在只操作当前组件内的元素。
 */
const boxElements = ref<HTMLElement[]>([]);

const checkBoxs = () => {
  // 触发线：屏幕高度的 80%
  const triggerBottom = (window.innerHeight / 5) * 4;

  boxElements.value.forEach((box) => {
    if (!box) return;
    const boxTop = box.getBoundingClientRect().top;

    // 核心逻辑：只要由下往上穿过了触发线，就一直显示 (boxTop 变小)
    // 只有当元素重新掉回到触发线下方时 (boxTop 变大)，才移除 show
    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
};

// 当挂载完毕后，执行box的动画
onMounted(() => {
  checkBoxs();
  window.addEventListener("scroll", checkBoxs);
});

// 当销毁组件时，移除监听事件
onUnmounted(() => {
  window.removeEventListener("scroll", checkBoxs);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.scroll-animation-body {
  font-family: "Ubuntu", sans-serif;
  background-color: #efedd6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

.box {
  background-color: steelblue;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 10px;
  transform: translateX(400%);
  transition: transform 0.5s ease-in-out;
}

.box:nth-of-type(even) {
  transform: translateX(-400%);
}

.box.show {
  transform: translateX(0);
}

.box h2 {
  font-size: 48px;
  margin: 0;
}
</style>
