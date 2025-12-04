<template>
  <div class="dad-jokes-body">
    <div class="container">
      <h3>Don't Laugh Challenge</h3>
      <div class="joke">{{ joke }}</div>
      <button @click="getJoke">Get a new joke</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
const joke = ref("Click the button to get a joke.");
const url = "https://icanhazdadjoke.com/";
const config = {
  headers: {
    Accept: "application/json",
  },
};
const getJoke = async () => {
  try {
    const response = await axios.get(url, config);
    joke.value = response.data.joke;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.dad-jokes-body {
  background-color: #686de0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Ubuntu", sans-serif;
}

.container {
  background-color: aliceblue;
  border-radius: 10px;
  max-width: 100%;
  width: 800px;
  padding: 50px 20px;
  text-align: center;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}

h3 {
  opacity: 0.5;
  margin: 0;
  letter-spacing: 2px;
}
.joke {
  font-size: 2rem;
  margin: 50px auto;
  line-height: 40px;
  letter-spacing: 1px;
  max-width: 600px;
}
button {
  background-color: #9f68e0;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
}

button:active {
  scale: 0.85;
}
</style>
