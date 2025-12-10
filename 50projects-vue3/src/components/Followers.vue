<template>
  <div class="followers-body">
    <div class="container" v-for="data in datas" :key="data.name">
      <i :class="data.iconClass"></i>
      <p>{{ data.initFollowers }}</p>
      <h3>{{ data.name }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Data {
  iconClass: string;
  name: string;
  followers: number;
  initFollowers: number;
}

const datas = ref<Data[]>([
  {
    iconClass: "fab fa-twitter fa-3x",
    name: "Twitter Followers",
    followers: 12000,
    initFollowers: 0,
  },
  {
    iconClass: "fab fa-youtube fa-3x",
    name: "Youtube Followers",
    followers: 5000,
    initFollowers: 0,
  },
  {
    iconClass: "fab fa-facebook fa-3x",
    name: "Facebook Followers",
    followers: 7500,
    initFollowers: 0,
  },
]);

let intervalId: number | null = null;

const incrementFollowers = () => {
  let completedCount = 0;

  datas.value.forEach((data) => {
    // 每次增加目标值的 0.5% (也就是 200 步完成)，向上取整确保至少加 1
    const increment = Math.ceil(data.followers / 200);

    if (data.initFollowers < data.followers) {
      if (data.initFollowers + increment >= data.followers) {
        data.initFollowers = data.followers;
        completedCount++;
      } else {
        data.initFollowers += increment;
      }
    } else {
      completedCount++;
    }
  });

  // 如果所有都完成了，清除定时器
  if (completedCount === datas.value.length && intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  intervalId = setInterval(incrementFollowers, 10);
});

onUnmounted(() => {
  // 避免数据动画还没播完，用户就切换页面或者关闭了组件。
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Muli");

.followers-body {
  font-family: "Muli", sans-serif;
  background-color: blueviolet;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  color: white;
  padding: 20px;
  text-align: center;
}
p {
  font-size: 32px;
}
h3 {
  font-size: 24px;
}
</style>
