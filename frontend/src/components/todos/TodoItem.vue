<script setup>
import TodoEditorDialog from "@/components/todos/TodoEditorDialog.vue";
import {ref} from "vue";
import {editTodo} from "@/api/services/todos.js";

const props = defineProps({
  todoObject: Object,
  deleteFunc: Function
});

const todo = ref({
  title: props.todoObject.title,
  completed: props.todoObject.completed,
  created_at: props.todoObject.created_at
});

const isEditorOpen = ref(false);
const showEditor = () => isEditorOpen.value = true;
const closeEditor = () => isEditorOpen.value = false;

const editItem = (newTodo = {title: todo.value.title, completed: todo.value.completed}) => {
  editTodo(newTodo, props.todoObject.id)
      .then(res => {
        console.warn("todo was updated", res.data);
        todo.value = res.data;
      })
      .catch(err => console.log(err));
}

const toggleCompletion = () => {
  todo.value.completed = !todo.value.completed;
  editItem();
}

</script>

<template>
  <div class="todo_item">
    <div class="info">
      <p class="title">{{ todo.title }}</p>
      <p class="status">completed: {{ todo.completed }}</p>
      <p class="creation_date">created at: {{ todo.created_at }}</p>
    </div>

    <div class="controls">
      <button @click="toggleCompletion" class="btn_status_changer">
        <span v-if="todo.completed">mark as complete</span>
        <span v-else>mark as incomplete</span>
      </button>
      <button class="btn_edit" @click="showEditor()">edit</button>
      <button @click="deleteFunc(todoObject.id)">delete</button>
    </div>

    <TodoEditorDialog v-if="isEditorOpen" :close="closeEditor" :submit-edit="editItem" :todo-object="todo" />
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