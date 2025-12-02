<template>
  <div class="loading-body">
    <section ref="bg" class="bg"></section>
    <div ref="loadText" class="loading-text">0%</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const loadText = ref<HTMLDivElement | null>(null);
const bg = ref<HTMLDivElement | null>(null);

// 计数器
let load = 0;
// 定时器
let init: number | undefined;

// 模糊函数
const blur = () => {
  load++;

  if (load > 99) {
    clearInterval(init);
  }

  if (loadText.value && bg.value) {
    loadText.value.textContent = `${load}%`;
    // load从0-100，opacity从1-0，blur从30-0
    loadText.value.style.opacity = String(scale(load, 0, 100, 1, 0));
    bg.value.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  }
};

// 1.当组件挂在完毕后执行模糊函数
onMounted(() => {
  init = setInterval(blur, 30);
});

// 2.当组件销毁时清除定时器
onUnmounted(() => {
  clearInterval(init);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.loading-body {
  font-family: "Ubuntu", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.bg {
  background: url(/assets/McLarenSnow.PNG) no-repeat center center/cover;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
}

.loading-text {
  font-size: 50px;
  color: #fff;
}
</style>
