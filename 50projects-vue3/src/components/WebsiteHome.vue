<template>
  <div class="website-home-body">
    <div ref="nav" :class="['nav', activeNav]">
      <div class="container">
        <h1 class="logo"><a href="#">My Website</a></h1>
        <ul>
          <li v-for="(nav, index) in navs" :key="index">
            <a href="#">{{ nav.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="hero">
      <div class="container">
        <h1>Welcome to my website</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </p>
      </div>
    </div>

    <section class="container content">
      <h2>Content One</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
        consectetur? Accusamus error necessitatibus voluptate sed natus nostrum
        mollitia minima unde saepe velit at, facere minus rem recusandae
        repudiandae laudantium repellendus qui. Omnis harum odio, totam magni
        unde rerum sunt assumenda nulla maiores aspernatur culpa quidem officia
        recusandae eligendi natus exercitationem cum dolorem, sed, pariatur
        corporis sequi sint. Repudiandae necessitatibus nesciunt autem ratione
        dicta debitis, impedit quas quae assumenda dignissimos voluptas id,
        laborum fuga error inventore perspiciatis quia laudantium culpa quaerat
        dolorem. Praesentium excepturi suscipit maiores, ipsum quibusdam
        possimus beatae, alias neque iste perspiciatis quae vitae architecto
        voluptate nesciunt ipsam minima?
      </p>

      <h3>Content Two</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        consequatur nam eligendi sunt est rem ut sequi placeat animi autem esse
        hic vitae officia debitis laudantium sit, optio tempora voluptatibus
        doloribus et? Consequatur cum exercitationem aliquid. Dolorum nulla
        maxime ex magnam, labore voluptatibus facilis! Excepturi adipisci itaque
        quos iste natus.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Nav {
  name: string;
}

const navs = ref<Nav[]>([
  { name: "Home" },
  { name: "About" },
  { name: "Service" },
  { name: "Contact" },
]);

// 初始化 nav 的 ref，注意类型可能为 null
const nav = ref<HTMLDivElement | null>(null);
// 使用 ref 而不是 computed 来存储 active 状态
const activeNav = ref("");

// 滚动处理函数
const handleScroll = () => {
  // 安全检查：如果 nav 还没渲染或者被销毁，直接返回
  if (!nav.value) return;

  // 注意：通常使用的是 window.scrollY (文档滚动距离)
  // 而不是 window.screenY (浏览器窗口在显示器上的垂直位置)
  if (window.scrollY > nav.value.offsetHeight + 150) {
    activeNav.value = "active";
  } else {
    activeNav.value = "";
  }
};

// 在组件挂载完成后添加监听器
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 养成好习惯：组件卸载时移除监听器，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans");

.website-home-body {
  font-family: "Open Sans", sans-serif;
  color: #222;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #222;
  width: 100%;
  transition: all 0.3s ease-in-out;
}
.nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  transition: padding 0.3s ease-in-out;
}
.nav ul {
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
}
.nav a {
  color: white;
  text-decoration: none;
  padding: 7px 15px;
  transition: color 0.3s ease-in-out;
}
.nav a:hover {
  color: red;
  font-weight: bold;
}
.nav.active {
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.nav.active a {
  color: #222;
}
.nav.active a:hover {
  color: red;
  font-weight: bold;
}
.nav.active .container {
  padding: 2px 0;
}

.hero {
  background-image: url("../assets/McLarenSnow.PNG");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: -2;
}

/* 遮罩 */
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.hero h1 {
  font-size: 46px;
  margin: -20px 0 20px;
}

.hero p {
  letter-spacing: 1px;
  font-size: 20px;
}

.content h2,
.content h3 {
  font-size: 150%;
  margin: 20px 0;
}

.content p {
  color: #555;
  line-height: 30px;
  letter-spacing: 1.2px;
}
</style>
