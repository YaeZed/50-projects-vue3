<template>
  <button class="add" id="add" @click="addNote">
    <i class="fas fa-plus"></i> Add Note
  </button>

  <div class="notes-container">
    <NoteCard
      v-for="(note, index) in notes"
      :key="note.id"
      :id="note.id"
      :text="note.text"
      @delete="deleteNote(index)"
      @update="(val) => updateNote(index, val)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import NoteCard from "./NoteCard.vue";

interface Note {
  id: string;
  text: string;
}

// 1. 初始化数据
const notes = ref<Note[]>([]);

// 从本地加载
onMounted(() => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    // 假设旧数据只是字符串数组，这里做了兼容处理
    const parsed = JSON.parse(savedNotes);
    notes.value =
      typeof parsed[0] === "string"
        ? parsed.map((text: string) => ({
            id: Date.now().toString() + Math.random(),
            text,
          }))
        : parsed;
  }
});

// 2. 监听变化并保存
watch(
  notes,
  (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
  },
  { deep: true },
);

// 3. 操作方法
const addNote = () => {
  notes.value.push({
    id: Date.now().toString(),
    text: "",
  });
};

const deleteNote = (index: number) => {
  notes.value.splice(index, 1);
};

const updateNote = (index: number, newText: string) => {
  notes.value[index]!.text = newText;
};
</script>

<style>
/* 全局样式 */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap");

body {
  background-color: #7bdaf3;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding-top: 3rem;
}

.notes-container {
  display: flex;
  flex-wrap: wrap;
}

.add {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #9ec862;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1000;
}

.add:active {
  transform: scale(0.95);
}
</style>
