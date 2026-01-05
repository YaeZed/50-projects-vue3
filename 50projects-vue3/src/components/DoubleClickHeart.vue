<template>
  <div class="double-click-heart-body">
    <h3>Double click on the image to <i class="fa fa-heart"></i>it</h3>
    <small
      >You liked it <span id="times"> {{ times }} </span> times</small
    >

    <div class="loveMe" ref="loveMe" @click="addHeart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let clickTime = ref(0);
const times = ref(0);
const loveMe = ref<HTMLDivElement>();

const createHeart = (e: MouseEvent) => {
  if (!loveMe.value) return;

  // 【修复2】使用 getBoundingClientRect 确保坐标计算在任何布局下都准确
  const rect = loveMe.value.getBoundingClientRect();
  const xInside = e.clientX - rect.left;
  const yInside = e.clientY - rect.top;

  const heart = document.createElement("i");
  heart.classList.add("fa", "fa-heart");

  // 设置位置
  heart.style.left = `${xInside}px`;
  heart.style.top = `${yInside}px`;

  loveMe.value.appendChild(heart);

  times.value++; // 建议把计数放在创建心形的时候

  setTimeout(() => {
    heart.remove();
  }, 1000);
};

const addHeart = (e: MouseEvent) => {
  if (clickTime.value === 0) {
    clickTime.value = new Date().getTime();
  } else {
    // 800ms 的判定间隔
    if (new Date().getTime() - clickTime.value < 800) {
      createHeart(e);
      clickTime.value = 0;
    } else {
      clickTime.value = new Date().getTime();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oswald");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");

.double-click-heart-body {
  height: 100vh;
  font-family: "Oswald", sans-serif;
  text-align: center;
  /* 防止页面滚动影响演示，根据需要添加 */
  overflow: hidden;
  margin: 0;
}

h3 {
  font-weight: bold;
  margin-bottom: 20px;
}

.fa {
  color: red;
}

small {
  display: block;
  margin-bottom: 20px;
}

.loveMe {
  /* 请确保这里的路径是正确的，参考上一个问题的回答 */
  background: url("/assets/McLarenSnow.PNG") no-repeat center center / cover;
  height: 440px;
  width: 300px;
  margin: auto;
  cursor: pointer;
  max-width: 100%;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  /* 确保用户频繁点击时不会选中 div 导致变蓝 */
  user-select: none;
}

/* 【修复1】使用 :deep() 穿透 Scoped 限制，否则动态生成的 JS 元素吃不到样式 */
.loveMe :deep(.fa) {
  color: red;
  position: absolute;
  animation: grow 0.6s linear;
  transform: translate(-50%, -50%) scale(0);
}

@keyframes grow {
  to {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
</style>
