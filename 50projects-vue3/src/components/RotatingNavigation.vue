<template>
  <div class="rotatingNavigation-body">
    <div :class="showNav ? 'container show-nav' : 'container'">
      <div class="circle-container">
        <div class="circle">
          <button id="close" @click="showNav = false">
            <i class="fas fa-times"></i>
          </button>
          <button id="open" @click="showNav = true">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div class="content">
        <h1>Welcome to my website</h1>
        <small>Created by YaeZed</small>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          quibusdam delectus harum consequuntur at soluta provident, veritatis
          nulla minima accusamus dolores eius doloremque voluptatibus illo
          ratione nostrum molestiae dolorem non odio laborum. Neque ea veritatis
          esse doloribus asperiores exercitationem modi sit est sed sapiente
          quaerat atque ut praesentium ad, alias fugiat eaque vel molestiae sunt
          corporis qui quod dolore et officiis. Beatae impedit esse doloremque
          ad eum voluptatum possimus nihil, voluptas est? Ipsa dolore
          perspiciatis, nobis consequuntur illo doloremque eaque necessitatibus
          tempora deleniti amet. Voluptates impedit consectetur vero,
          accusantium optio ad quibusdam laboriosam, deleniti dolor soluta enim
          quisquam nesciunt ea!
        </p>
        <h3>McLaren</h3>
        <img src="/assets/McLarenSnow.PNG" alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi animi
          ipsa nulla, et dolores consequatur voluptas ipsum quae omnis
          consectetur possimus eum sint sit quibusdam exercitationem numquam
          voluptate aliquid non nostrum excepturi amet impedit culpa similique!
          Facere adipisci consequuntur dolor enim amet. Ab fuga deleniti
          reprehenderit ipsam tempora saepe doloremque.
        </p>
      </div>
    </div>

    <nav>
      <ul>
        <li v-for="li in lis">
          <i :class="li.class"></i>
          {{ li.name }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

interface NavItem {
  name: string;
  class: string;
}

const lis = reactive<NavItem[]>([
  { name: "Home", class: "fas fa-home" },
  { name: "About", class: "fas fa-user" },
  { name: "Contact", class: "fas fa-envelope" },
]);

const showNav = ref(false);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
* {
  box-sizing: border-box;
}
</style>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");
.rotatingNavigation-body {
  font-family: "Lato", sans-serif;
  background-color: #333;
  color: #222;
  overflow-x: hidden;
  margin: 0;
}
.container {
  background-color: #fafafa;
  /* 旋转中心 */
  transform-origin: top left;
  transition: transform 0.5s linear;
  width: 100vw;
  min-height: 100vh;
  padding: 50px;
}

.circle-container {
  position: fixed;
  top: -100px;
  left: -100px;
}

.circle {
  background-color: #ff7979;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  transition: transform 0.5s linear;
}

.circle button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  background-color: transparent;
  border: none;
  font-size: 26px;
  color: #fafafa;
}

.circle button:focus {
  outline: none;
}

.circle button#open {
  left: 60%;
}

.circle button#close {
  top: 60%;
  transform: rotate(90deg);
  transform-origin: top left;
}

.container.show-nav {
  transform: rotate(-20deg);
}

.container.show-nav .circle {
  transform: rotate(-70deg);
}

/* 当container有show-nav类时，显示nav里的li类样式 */
.container.show-nav + nav li {
  transform: translateX(0);
  transition-delay: 0.3s;
}

img {
  width: 100%;
}

.content {
  max-width: 1000px;
  margin: 50px auto;
}

.content h1 {
  margin: 0;
}

.content small {
  color: #555;
  font-style: italic;
}

.content p {
  color: #333;
  line-height: 1.5;
}

nav {
  position: fixed;
  bottom: 40px;
  left: 0;
  z-index: 100;
}

nav ul {
  list-style: none;
  padding-left: 30px;
}

nav ul li {
  cursor: pointer;
  color: #fafafa;
  margin: 40px 0;
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

nav ul li i {
  font-size: 20px;
  margin-right: 10px;
}

nav ul li + li {
  margin-left: 15px;
  transform: translateX(-150%);
}

nav ul li + li + li {
  margin-left: 30px;
  transform: translateX(-200%);
}
</style>
