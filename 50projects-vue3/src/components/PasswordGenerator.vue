<template>
  <div class="password-generator-body">
    <div class="container">
      <h2>Password Generator</h2>
      <div class="result-container">
        <span>{{ generatedPassword }}</span>
        <button class="btn" @click="copyToClipboard">
          <i class="far fa-clipboard"></i>
        </button>
      </div>

      <div class="settings">
        <div class="setting">
          <label for="">length</label>
          <input type="number" min="8" max="16" v-model.number="length" />
        </div>
        <div class="setting" v-for="item in configOptions" :key="item.id">
          <label for="">{{ item.label }}</label>
          <input type="checkbox" v-model="item.checked" />
        </div>
      </div>

      <button class="btn btn-large" @click="generatePassword">
        Generate Password
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const length = ref(8);
const generatedPassword = ref("");

// 选项的配置
const configOptions = ref([
  { id: "uppercase", label: "Include uppercase letters", checked: true },
  { id: "lowercase", label: "Include lowercase letters", checked: true },
  { id: "numbers", label: "Include numbers", checked: true },
  { id: "symbols", label: "Include symbols", checked: true },
]);

// 随机函数定义
const randomFunc: Record<string, () => string> = {
  lowercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  uppercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  numbers: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbols: () => {
    const symbols = "!@#$%^&*()_+{}[];:<>,.?/~`|";
    return symbols[Math.floor(Math.random() * symbols.length)]!;
  },
};

// 获取选中的settings
const trueSelected = computed(() => {
  return configOptions.value
    .filter((item) => item.checked)
    .map((item) => item.id);
});

const generatePassword = () => {
  const typeCount = trueSelected.value.length;
  if (typeCount === 0) {
    alert("Please choose at least one option");
    return;
  }
  let finalPassword = "";
  for (let i = 0; i < length.value; i += typeCount) {
    trueSelected.value.forEach((type) => {
      // 获取对象的函数
      finalPassword += randomFunc[type]!();
    });
  }
  // 截断对应长度后的值
  generatedPassword.value = finalPassword.slice(0, length.value);
};

const copyToClipboard = () => {
  if (!generatedPassword.value) return;
  navigator.clipboard.writeText(generatedPassword.value);
  alert("Password copied to clipboard!");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
.password-generator-body {
  color: #fff;
  background-color: #3b3b98;
  height: 100vh;
  display: flex;
  font-family: "Muli", sans-serif;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: #3b3b98;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 350px;
  max-width: 100%;
}
h2 {
  text-align: center;
  margin: 10px 0 20px;
}
.result-container {
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
}

.result-container #result {
  /* 避免长单词换行 */
  overflow-wrap: break-word;
  max-width: calc(100% - 40px);
  overflow-y: scroll;
  height: 100%;
}

#result::-webkit-scrollbar {
  width: 1rem;
}

.result-container .btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.setting {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.btn {
  border: none;
  background-color: #3b9876;
  color: #fff;
  font-size: 18px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-large {
  display: block;
  width: 100%;
}

.btn:hover {
  scale: 1.1;
}

.btn:active {
  scale: 0.9;
}
</style>
