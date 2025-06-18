<script setup>
import TodoItem from "@/components/todos/TodoItem.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {listTodos} from "@/api/services/todos.js";

const todos = ref([]);

onBeforeMount(() => {
  listTodos()
      .then(res => {
        todos.value = res.data;
      });
});

</script>

<template>
  <h2>todos</h2>

  <h4 v-if="todos.length === 0">todos are empty...</h4>
  <TodoItem v-else
            v-for="todo in todos"
            :title="todo.title"
            :completed="todo.completed"
            :created-at="todo.created_at"
            :key="todo.id"/>
</template>

<style scoped>

</style>