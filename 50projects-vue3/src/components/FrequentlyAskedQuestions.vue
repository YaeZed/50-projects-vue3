<template>
  <div class="fre-ask-quesion-body">
    <h1>Frequently Asked Questions</h1>

    <div class="faq-container">
      <div
        class="faq"
        :class="question.isActive ? 'active' : ''"
        v-for="(question, index) in questions"
        :key="index"
      >
        <div class="faq-title">{{ question.title }}</div>
        <div class="faq-text">{{ question.answer }}</div>

        <button class="faq-toggle">
          <i
            class="fas fa-chevron-down"
            @click="questions[index]!.isActive = true"
          ></i>
          <i
            class="fas fa-times"
            @click="questions[index]!.isActive = false"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { questions } from "../ts/questions";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");

.fre-ask-quesion-body {
  font-family: "Ubuntu", sans-serif;
}

h1 {
  margin: 50px 0 30px;
  text-align: center;
}

.faq-container {
  max-width: 600px;
  margin: 0 auto;
}

.faq {
  position: relative;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 20px 0;
  padding: 30px;
  font-family: inherit;
  transition: 0.3s ease;
}

.faq.active {
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.faq.active::before,
.faq.active::after {
  content: "\f075";
  font-family: "Font Awesome 5 Free";
  font-size: 7rem;
  position: absolute;
  color: #2ecc71;
  opacity: 0.2;
  top: 20px;
  left: 60px;
  z-index: 0;
}
.faq.active::before {
  color: #3498db;
  top: -10px;
  left: -1px;
  transform: rotateY(180deg);
}

.faq-title {
  font-weight: bold;
  margin: 0 35px 0 0;
}

.faq-toggle {
  position: absolute;

  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
}

/* 默认状态 */
.faq-text {
  display: none;
  margin: 30px 0 0;
}
.fa-chevron-down {
  display: block;
}

.fa-times {
  display: none;
}

/* 激活状态 */
.faq.active .faq-toggle .fa-times {
  display: block;
  color: #fff;
}
.faq.active .faq-text {
  display: block;
}
.faq.active .fa-chevron-down {
  display: none;
}
.faq.active .faq-toggle {
  background-color: #9fa4a8;
}
</style>
