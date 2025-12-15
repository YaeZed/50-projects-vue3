<template>
  <div
    class="background-slider-body"
    :style="{ backgroundImage: `url(${imageUrls[activeIndex]?.url})` }"
  >
    <div class="slider-container">
      <div
        class="slider"
        :class="{ active: index === activeIndex }"
        v-for="(image, index) in imageUrls"
        :key="index"
        :style="{ backgroundImage: `url(${image.url})` }"
      ></div>
      <button class="arrow left-arrow" @click="prevSlide">
        <i class="fas fa-arrow-left"></i>
      </button>

      <button class="arrow right-arrow" @click="nextSlide">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const imageUrls = ref([
  { url: "/assets/background.PNG" },
  { url: "/assets/beauty.jpg" },
  { url: "/assets/Fall.PNG" },
  { url: "/assets/koenigsegg.PNG" },
  { url: "/assets/McLarenSnow.PNG" },
  { url: "/assets/wildHe.PNG" },
]);
const activeIndex = ref(0);

// 切换逻辑
const nextSlide = () => {
  activeIndex.value++;
  if (activeIndex.value > imageUrls.value.length - 1) {
    activeIndex.value = 0;
  }
};

const prevSlide = () => {
  activeIndex.value--;
  if (activeIndex.value < 0) {
    activeIndex.value = imageUrls.value.length - 1;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");

.background-slider-body {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  transition: 0.4s;
  z-index: 0;
}

.background-slider-body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.slider-container {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 70vw;
  height: 70vh;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.slider {
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background-position: center center;
  background-size: cover;
  position: absolute;
  /* 配合容器居中，数学上通常是 15vw，也就是 (100-70)/2）*/
  top: -15vh;
  left: -15vw;
  z-index: 1;
  transition: 0.4s ease;
}
.slider.active {
  opacity: 1;
}

.arrow {
  position: fixed;
  background-color: transparent;
  color: #fff;
  padding: 20px;
  font-size: 30px;
  border: 2px solid orange;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.arrow:focus {
  outline: none;
}

.left-arrow {
  left: calc(15vw - 60px);
}

.right-arrow {
  right: calc(15vw - 60px);
}
</style>
