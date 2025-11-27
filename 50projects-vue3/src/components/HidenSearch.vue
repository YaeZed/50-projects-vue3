<template>
  <div class="search-body">
    <div class="search" :class="{ active: isActive }">
      <input
        ref="inputRef"
        type="text"
        class="input"
        placeholder="Search..."
        @keydown.enter="handleEnter"
      />
      <button class="btn" @click="toggleSearch">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

// 定义一个状态，用于切换输入框
const isActive = ref(false);

// 定义模板中的input的ref
// 注意：变量名必须与 template 中的 ref="inputRef" 一致
// 类型设置为 HTMLInputElement | null
const inputRef = ref<HTMLInputElement | null>(null);

// btn的点击事件：切换isActive状态，聚焦input
const toggleSearch = () => {
  isActive.value = !isActive.value;

  // 如果是展开状态，聚焦input
  if (isActive.value) {
    // 使用 nextTick 确保 DOM 更新后再聚焦（虽然此处 CSS 动画不阻塞，但在 Vue 中是好习惯）
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};

// input的回车事件：隐藏搜索框，input失去焦点
const handleEnter = () => {
  // 移除active
  isActive.value = false;
  // blur() 方法用于移除焦点
  inputRef.value?.blur();
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");
* {
  box-sizing: border-box;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.search-body {
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.search {
  position: relative;
  height: 50px;
}

.input {
  background-color: #fff;
  border: none;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 50px;
  transition: width 0.3s ease;
}

.btn {
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
}

.input:focus,
.btn:focus {
  outline: none;
}

.search.active .input {
  width: 200px;
  border: #bebebe solid 1px;
}
.search.active .btn {
  transform: translateX(200px);
}
</style>
