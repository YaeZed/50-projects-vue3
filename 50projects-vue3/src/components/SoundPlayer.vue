<template>
  <div class="sound-body">
    <div class="container">
      <div
        class="card"
        v-for="(sound, index) in sounds"
        @click="playSound(index)"
      >
        {{ sound.name }}
        <audio :src="sound.url" ref="audioRefs"></audio>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Sound {
  name: string;
  url: string;
}

const sounds = ref<Sound[]>([
  { name: "applause", url: "/sounds/applause.mp3" },
  { name: "boo", url: "/sounds/boo.mp3" },
  { name: "gasp", url: "/sounds/gasp.mp3" },
  { name: "tada", url: "/sounds/tada.mp3" },
  { name: "victory", url: "/sounds/victory.mp3" },
  { name: "wrong", url: "/sounds/wrong.mp3" },
]);

const audioRefs = ref<HTMLAudioElement[]>([]);

const playSound = (index: number) => {
  const currentAudio = audioRefs.value[index];
  if (currentAudio) {
    // 先停止所有音乐
    audioRefs.value.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    currentAudio.play();
  }
};
</script>

<style scoped>
.sound-body {
  height: 100vh;
  width: 100%;
  background-color: blueviolet;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background-color: rebeccapurple;
  color: white;
  font-size: 1.2rem;
  margin: 10px;
  padding: 1.2rem 3rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  opacity: 0.8;
}
.card:active {
  scale: 0.8;
}
</style>
