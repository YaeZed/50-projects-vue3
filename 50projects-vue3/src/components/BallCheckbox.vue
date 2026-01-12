<template>
  <div class="ball-checkbox-body">
    <h2>Ball Checkbox</h2>
    <div
      class="toggle-container"
      v-for="(box, index) in boxList"
      :key="box.name"
    >
      <input
        type="checkbox"
        :id="'toggle-' + index"
        class="toggle-input"
        v-model="box.isChecked"
      />

      <label :for="'toggle-' + index" class="toggle-label">
        <div class="ball"></div>
      </label>

      <span>{{ box.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const boxList = ref([
  { name: "box1", isChecked: false },
  { name: "box2", isChecked: false },
  { name: "box3", isChecked: false },
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.ball-checkbox-body {
  font-family: "Roboto", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.toggle-container {
  display: flex;
  align-items: center;
  margin: 10px;
}

/* 4. 隐藏 input 的标准做法：不占用空间但保留在 DOM 树中 */
.toggle-input {
  display: none;
}

.toggle-label {
  position: relative;
  background-color: #d1d9e6; /* 默认未选中的背景色 */
  width: 80px;
  height: 40px;
  border-radius: 50px;
  cursor: pointer;
  margin: 0 15px;
  transition: background-color 0.3s ease;
}

/* 选中后的背景色 */
.toggle-input:checked + .toggle-label {
  background-color: #8e44ad;
}

.ball {
  background: #fff;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  /* 5. 使用 transition 代替 keyframes，性能更好且逻辑更简单 */
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 6. 当 input 选中时，移动 ball */
.toggle-input:checked + .toggle-label .ball {
  transform: translateX(40px);
}
</style>
