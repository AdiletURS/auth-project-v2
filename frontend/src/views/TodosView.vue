<script setup>
import TodoItem from "@/components/todos/TodoItem.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {createTodo, listTodos} from "@/api/services/todos.js";
import TodoEditorDialog from "@/components/todos/TodoEditorDialog.vue";


const todos = ref([]);

const isEditorOpen = ref(false);
const openEditor = () =>
    isEditorOpen.value = true;
const closeEditor = () =>
    isEditorOpen.value = false;

const createItem = (todo) => {
  console.log(todo);
  createTodo(todo)
      .then(res => {
        const newTodo = res.data;
        todos.value.unshift(newTodo);
        console.log("new todo", newTodo);
      });
}

onBeforeMount(() => {
  listTodos()
      .then(res => {
        todos.value = res.data;
      });
});
</script>

<template>
  <h2>todos</h2>
  <button @click="openEditor">create a todo</button>
  <TodoEditorDialog v-if="isEditorOpen" label="create item" :close="closeEditor" :submit-edit="createItem" />


  <h4 v-if="todos.length === 0">todos are empty...</h4>
  <TodoItem v-else
            v-for="todo in todos"
            :todo-object="todo"
            :key="todo.id"/>
</template>

<style scoped>

</style>