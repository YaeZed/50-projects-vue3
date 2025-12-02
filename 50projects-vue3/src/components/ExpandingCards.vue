<template>
  <div class="cardsBody">
    <div class="container">
      <!-- 动态绑定card的imageUrl，js对象语法 -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="panel"
        :class="{ active: activeIndex === index }"
        :style="{ backgroundImage: `url(${card.imageUrl})` }"
        @click="handleCardClick(index)"
      >
        <h1>{{ card.title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 构建card类型接口
interface Card {
  title: string;
  imageUrl: string;
}

const cards = ref<Card[]>([
  {
    title: "Explore the world",
    imageUrl: "/assets/background.PNG",
  },
  {
    title: "Beauty",
    imageUrl: "/assets/beauty.jpg",
  },
  {
    title: "Fall",
    imageUrl: "/assets/Fall.PNG",
  },
  {
    title: "Koenigsegg",
    imageUrl: "/assets/koenigsegg.PNG",
  },
  {
    title: "McLarenSnow",
    imageUrl: "/assets/McLarenSnow.PNG",
  },
  {
    title: "wildHe",
    imageUrl: "/assets/wildHe.PNG",
  },
]);

// 定义状态，记录当前哪一个panel是激活的
const activeIndex = ref<number>();
// 定义方法，切换激活的panel
const handleCardClick = (index: number) => {
  activeIndex.value = index;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");

:global(body) {
  margin: 0;
  overflow: hidden;
}

.cardsBody {
  font-family: "Muli", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  display: flex;
  width: 70vw;
}

.panel {
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
  border-radius: 50px;
  color: whitesmoke;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  transition: flex 0.7s ease-in-out;
}

.panel h1 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}
.panel.active {
  flex: 5;
}
.panel.active h1 {
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0.4s;
}

/* 小屏幕 */
@media (max-width: 700px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(6) {
    display: none;
  }
}
</style>
