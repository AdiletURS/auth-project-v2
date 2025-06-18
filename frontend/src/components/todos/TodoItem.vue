<script setup>
import TodoEditDialog from "@/components/todos/TodoEditDialog.vue";
import {ref} from "vue";
import {editTodo} from "@/api/services/todos.js";

const props = defineProps({
  todoObject: Object
});

const todo = ref({
  title: props.todoObject.title,
  completed: props.todoObject.completed,
  createdAt: props.todoObject.created_at
});

const isEditorOpen = ref(false);
const showEditor = () => isEditorOpen.value = true;
const closeEditor = () => isEditorOpen.value = false;

const editItem = (title, completed = todo.value.completed) => {
  const todoObj = {
    title,
    completed
  }

  editTodo(todoObj, props.todoObject.id)
      .then(res => {
        console.warn("todo was updated", res.data);
        todo.value = res.data;
      })
      .catch(err => console.log(err));
}

</script>

<template>
  <div class="todo_item">
    <div class="info">
      <p class="title">{{ todo.title }}</p>
      <p class="status">completed: {{ todo.completed }}</p>
      <p class="creation_date">created at: {{ todo.createdAt }}</p>
    </div>

    <div class="controls">
      <button class="btn_status_changer">mark as complete</button>
      <button class="btn_edit" @click="showEditor()">edit</button>
    </div>

    <TodoEditDialog v-if="isEditorOpen" :close="closeEditor" :submit-edit="editItem" :todo-object="todo" />
  </div>
</template>

<style scoped>
.todo_item {
  padding: 24px;
  display: flex;
  justify-content: space-between;

  border: 2px solid var(--color-secondary);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>