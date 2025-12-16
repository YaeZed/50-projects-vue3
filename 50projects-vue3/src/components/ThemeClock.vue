<template>
  <div class="theme-clock-body" :class="{ dark: !isLightMode }">
    <button @click="toggleMode" class="btn">
      {{ buttonText }}
    </button>

    <div class="clock-container">
      <div class="clock">
        <div class="needle hour" :style="{ transform: hourTransform }"></div>
        <div
          class="needle minute"
          :style="{ transform: minuteTransform }"
        ></div>
        <div
          class="needle second"
          :style="{ transform: secondTransform }"
        ></div>
        <div class="center-point"></div>
      </div>
    </div>

    <div class="time">
      {{ formattedTime }}
    </div>

    <div class="date">
      {{ days[timeState.day] }}, {{ months[timeState.month] }}
      <span class="circle">{{ timeState.date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from "vue";

// --- 1. 主题切换逻辑 ---
const isLightMode = ref(true);
const buttonText = computed(() =>
  isLightMode.value ? "Dark Mode" : "Light Mode"
);
const toggleMode = () => (isLightMode.value = !isLightMode.value);

// --- 2. 时间状态管理 ---
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// 使用 reactive 存储当前时间的基础数值
const timeState = reactive({
  hour: 0,
  minute: 0,
  second: 0,
  month: 0,
  day: 0,
  date: 0,
});

// --- 3. 核心算法：无限旋转逻辑 (解决倒转 Bug) ---
// 记录圈数，防止角度归零导致指针反转
const loops = reactive({
  second: 0,
  minute: 0,
  hour: 0,
});

// 计算属性：时针角度 (包含分钟偏移 + 圈数累加)
const hourTransform = computed(() => {
  // 小时 (0-11) + 分钟占比 (0-1)
  const hourValue = (timeState.hour % 12) + timeState.minute / 60;
  // 基础角度 + 圈数 * 360
  const degrees = hourValue * 30 + loops.hour * 360;
  return `translate(-50%, -100%) rotate(${degrees}deg)`;
});

// 计算属性：分针角度
const minuteTransform = computed(() => {
  const degrees = timeState.minute * 6 + loops.minute * 360;
  return `translate(-50%, -100%) rotate(${degrees}deg)`;
});

// 计算属性：秒针角度
const secondTransform = computed(() => {
  const degrees = timeState.second * 6 + loops.second * 360;
  return `translate(-50%, -100%) rotate(${degrees}deg)`;
});

// --- 4. 时间更新与圈数监听 ---
const updateTime = () => {
  const time = new Date();
  timeState.month = time.getMonth();
  timeState.day = time.getDay();
  timeState.date = time.getDate();

  // 更新时分秒
  timeState.hour = time.getHours();
  timeState.minute = time.getMinutes();
  timeState.second = time.getSeconds();
};

// 监听器：当时间从 59->0 或 11->0 时，圈数加 1
// 必须监听 getter 函数 () => timeState.x
watch(
  () => timeState.second,
  (newVal, oldVal) => {
    if (oldVal === 59 && newVal === 0) loops.second++;
  }
);
watch(
  () => timeState.minute,
  (newVal, oldVal) => {
    if (oldVal === 59 && newVal === 0) loops.minute++;
  }
);
watch(
  () => timeState.hour,
  (newVal, oldVal) => {
    // 处理 12小时制的回环 (11 -> 12/0)
    // 注意：getHours 返回 0-23，我们主要关心 % 12 的变化
    const oldH = oldVal % 12;
    const newH = newVal % 12;
    if (oldH === 11 && newH === 0) loops.hour++;
  }
);

// --- 5. 辅助显示 ---
const formattedTime = computed(() => {
  const h = timeState.hour;
  const m = timeState.minute;
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 || 12;
  const displayMinute = m < 10 ? `0${m}` : m;
  return `${displayHour}:${displayMinute} ${ampm}`;
});

// --- 6. 生命周期 ---
let intervalId: number;
onMounted(() => {
  updateTime(); // 立即执行一次
  intervalId = setInterval(updateTime, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

/* 全局变量定义 */
.theme-clock-body {
  /* 亮色模式变量 */
  --primary-color: #000;
  --secondary-color: #fff;
  --needle-color: #000; /* 针的颜色 */
  --second-hand-color: #e74c3c; /* 秒针颜色 */

  font-family: "Roboto", sans-serif;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease, color 0.5s ease;
  overflow: hidden;
}

/* 深色模式变量重写 */
.theme-clock-body.dark {
  --primary-color: #fff;
  --secondary-color: #111; /* 稍微浅一点的黑，更有质感 */
  --needle-color: #fff;
}

/* 按钮样式 */
.btn {
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 0;
  padding: 8px 12px;
  border-radius: 4px;
  position: absolute;
  top: 80px;
  font-weight: bold;
  transition: transform 0.1s ease;
}
.btn:active {
  transform: scale(0.95);
}

/* 时钟盘面 */
.clock {
  position: relative;
  width: 200px;
  height: 200px;
}

/* 指针通用样式 */
.needle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  background-color: var(--needle-color);
  transform-origin: bottom center;
  transition: transform 0.5s ease-in-out;
}

.needle.hour {
  height: 65px;
  width: 4px; /* 时针粗一点 */
}

.needle.minute {
  height: 100px;
  width: 3px;
}

.needle.second {
  height: 120px;
  background-color: var(--second-hand-color);
  width: 2px; /* 秒针细一点 */
  z-index: 10; /* 秒针在最上面 */
}

/* 中心圆点 */
.center-point {
  background-color: var(--second-hand-color);
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 11;
}

.center-point::after {
  content: "";
  background-color: var(--needle-color);
  width: 4px;
  height: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

/* 数字时间 */
.time {
  font-size: 50px;
  margin-top: 40px;
  font-weight: 300;
}

/* 日期 */
.date {
  color: #aaa; /* 日期文字保持灰色 */
  font-size: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  margin-top: 10px;
}

/* 日期圆圈 */
.circle {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 20px;
  height: 20px;
  /* inline-flex 是为了既要它跟在月份后面不换行，又要利用 Flexbox 把里面的数字弄到正中间。 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  margin-left: 5px;
  transition: all 0.5s ease;
}
</style>
