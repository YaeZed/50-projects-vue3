<template>
 <div class="skeleton-body">
    
        <div class="card">
            <div class="card-header"
            :class="{ 'animated-bg': isLoading }"
            >
                <img :src="profileImg" alt="">
            </div>
            <div class="card-content"
            >
                <h3 class="card-title"
                :class="isLoading ? 'animated-bg animated-bg-text' : '' "
                >{{ title }}</h3>
                <p class="card-excerpt">
                    <span v-for="n in 3" 
                    :class="isLoading ? 'animated-bg animated-bg-text' : '' "
                    >{{ excerpt }}</span>
                </p>
                <div class="author">
                    <div class="profile-img"
                    :class="{ 'animated-bg': isLoading }"
                    >
                        <img :src="authorImg" alt="">
                    </div>
                    <div class="author-info">
                        <strong :class="isLoading ? 'animated-bg animated-bg-text' : '' ">{{ author }}</strong>
                        <small :class="isLoading ? 'animated-bg animated-bg-text' : '' ">{{ date }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
 
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 等待2.5秒后，骨架屏消失，赋值参数
const title = ref("")
const excerpt = ref("")
const author = ref("")
const profileImg = ref("")
const authorImg = ref("")
const date = ref("")
// 控制参数
const isLoading = ref(false)

onMounted(() => {
    isLoading.value = true
    setTimeout(() => {
        title.value = "Card"
        excerpt.value = "one step forward"
        author.value = "YaeZed"
        date.value = "2025-12-23"
        profileImg.value = "/assets/McLarenSnow.PNG"
        authorImg.value = "/assets/wildHe.PNG"  
        isLoading.value = false
    }, 2500)
})
</script>

<style scoped >
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.skeleton-body{
    font-family: "Roboto", sans-serif;
    background-color: #ecf0f1;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card{
    width: 350px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}
.card-header{
    height: 200px;
}
.card-header img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.card-content {
  background-color: #fff;
  padding: 30px;
}

.card-title {
  height: 20px;
  margin: 0;
}

.card-excerpt {
  color: #777;
  margin: 10px 0 20px;
}

.author{
    display: flex;
    flex-direction: row;
}
.profile-img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
}
.profile-img img{
    width: 100%;
    height: 100%;
}
.author-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 100px;
}

.author-info small {
  color: #777;
  margin-top: -20px;
}

/* 骨架屏元素 */
.animated-bg {
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 10%,
    #f6f7f8 20%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1s linear infinite;
}
@keyframes bgPos {
    /* 实际位置 = （容器宽度 - 背景宽度） x  百分比 */
  0% {
    background-position: 50% 0%;
  }
  100% {
    background-position: -150% 0%;
  }
}

.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  margin: 0;
  height: 10px;
  width: 100%;
  height: 10px;
}
</style>