<template>
  <div class="note">
    <div class="tools">
      <button class="edit" @click="toggleEdit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete" @click="emit('delete')">
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <div v-if="!isEditing" class="main" v-html="htmlContent"></div>

    <textarea
      v-else
      :value="content"
      @input="handleInput"
      placeholder="输入内容..."
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";

// 定义 Props 和 Emits
const props = defineProps<{
  text: string;
  id: string;
}>();

const emit = defineEmits<{
  (e: "update", value: string): void;
  (e: "delete"): void;
}>();

// 内部状态：是否处于编辑模式
const isEditing = ref(props.text === "");
const content = ref(props.text);

// Markdown 渲染
const htmlContent = computed(() => marked.parse(content.value || ""));

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  content.value = target.value;
  emit("update", target.value);
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
.note {
  background-color: #fff;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  width: 400px;
  margin: 30px 20px;
  overflow: scroll;
}

.note .tools {
  background-color: #9ec862;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.note .tools button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.note textarea {
  outline: none;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  height: 350px;
  width: 100%;
  padding: 20px;
}

.main {
  padding: 20px;
}
</style>
