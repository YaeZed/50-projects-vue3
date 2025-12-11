<template>
  <div class="drinking-water-body">
    <h1>Drinking Water</h1>
    <h3>Goal:2 Liters</h3>

    <div class="cup">
      <div v-if="liters > 0" class="remained">
        <span class="liters">{{ liters }}L</span>
        <small>Remained</small>
      </div>
      <div
        v-if="percentage > 0"
        class="percentage"
        :style="{ height: percentage + '%' }"
      >
        {{ percentage }}%
      </div>
    </div>

    <p class="text">how many glasses of water that you have drank</p>

    <div class="cups">
      <div
        v-for="(cup, index) in cups"
        class="cup cup-small"
        :class="{ full: cup.isDrinked }"
        :key="index"
        @click="drink(index)"
      >
        {{ cup.volume }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const totalCups = 8;
const filledCnt = ref(0);

// 大杯子里的容量和百分比
const liters = computed(() => 2 - (250 * filledCnt.value) / 1000);
const percentage = computed(() => (filledCnt.value / totalCups) * 100);

// cups数组
const cups = Array.from({ length: totalCups }, () => ({
  volume: "250ml",
  isDrinked: false,
}));

// 小杯子的点击事件
const drink = (index: number) => {
  cups[index]!.isDrinked = !cups[index]!.isDrinked;
  filledCnt.value = cups.filter((cup) => cup.isDrinked).length;
};
</script>

<style>
:root {
  --border-color: #144fc6;
  --fill-color: #6ab3f8;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli");

.drinking-water-body {
  font-family: "Muli", sans-serif;
  background-color: var(--fill-color);
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 10px 0 0;
}

.cup {
  background-color: #fff;
  border: 4px solid var(--border-color);
  color: var(--border-color);
  border-radius: 0 0 40px 40px;
  height: 300px;
  width: 150px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.remained {
  display: flex;
  flex: 1; /* 占据 percentage 之外的所有空间 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
}

.remained span {
  font-size: 20px;
  font-weight: bold;
}

.remained small {
  font-size: 12px;
}

.percentage {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--fill-color);
  font-weight: bold;
  height: 0;
  width: 100%;
  transition: 0.3s ease-in-out;
}

.text {
  text-align: center;
  margin: 0 0 5px;
}

.cups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 250px;
}

.cup.cup-small {
  height: 95px;
  width: 50px;
  font-size: 14px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
}

.cup.cup-small.full {
  background-color: var(--fill-color);
  color: #fff;
}
</style>
