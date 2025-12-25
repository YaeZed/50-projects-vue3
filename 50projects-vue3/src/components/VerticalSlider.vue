<template>
  <div class="slider-container">
    <div
      class="left-slide"
      :style="{
        top: `-${(slides.length - 1) * 100}vh`,
        transform: `translateY(${activeSlideIndex * 100}vh)`,
      }"
    >
      <!-- 避免操作原数组，使用slice生成一个新的副本再逆置 -->
      <div
        v-for="(slide, index) in slides.slice().reverse()"
        :key="slide.title"
        :style="{ backgroundColor: slide.color }"
      >
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.desc }}</p>
      </div>
    </div>

    <div
      class="right-slide"
      :style="{
        transform: `translateY(-${activeSlideIndex * 100}vh)`,
      }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="img-container"
      >
        <img :src="slide.imgUrl" alt="" />
      </div>
    </div>

    <div class="action-buttons">
      <button class="down-button" @click="changeSlide('down')">
        <i class="fas fa-arrow-down"></i>
      </button>
      <button class="up-button" @click="changeSlide('up')">
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 1. 合并数据结构，让维护更简单
const slides = ref([
  {
    title: "Nature Flower",
    desc: "all in pink",
    color: "#fd555f",
    imgUrl:
      "https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80",
  },
  {
    title: "Blue Sky",
    desc: "with it's mountains",
    color: "#2a86ba",
    imgUrl:
      "https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80",
  },
  {
    title: "Lonely castle",
    desc: "in the wilderness",
    color: "#252e33",
    imgUrl:
      "https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80",
  },
  {
    title: "Flying eagle",
    desc: "in the sunset",
    color: "#ffb866",
    imgUrl:
      "https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80",
  },
]);

const activeSlideIndex = ref(0);

// 2. 切换逻辑
const changeSlide = (direction: "up" | "down") => {
  const slidesLength = slides.value.length;

  if (direction === "up") {
    activeSlideIndex.value++;
    if (activeSlideIndex.value > slidesLength - 1) {
      activeSlideIndex.value = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex.value--;
    if (activeSlideIndex.value < 0) {
      activeSlideIndex.value = slidesLength - 1;
    }
  }
};
</script>

<style scoped>
/* 引入 FontAwesome */
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css);
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

/* 容器必须 relative + overflow hidden */
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}

/* 左侧样式 */
.left-slide {
  height: 100%;
  width: 35%;
  position: absolute;
  left: 0;
  /* top 值在 template 中通过 :style 动态绑定 */
  transition: transform 0.5s ease-in-out;
}

.left-slide > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.left-slide h1 {
  font-size: 40px;
  margin-bottom: 10px;
  margin-top: -30px;
}

/* 右侧样式 */
.right-slide {
  height: 100%;
  position: absolute;
  top: 0;
  left: 35%; /* 紧贴着左侧 */
  width: 65%;
  transition: transform 0.5s ease-in-out;
}

/* 图片容器处理，模拟 background-cover */
.img-container {
  width: 100%;
  height: 100%;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：保证图片像背景图一样填充 */
  display: block;
}

/* 按钮样式 */
.action-buttons button {
  position: absolute;
  left: 35%;
  top: 50%;
  z-index: 100;
  background-color: white;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 15px;
  font-size: 16px;
}

.action-buttons button:hover {
  color: #222;
}

.action-buttons button:focus {
  outline: none;
}

.down-button {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.up-button {
  transform: translateY(-100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
