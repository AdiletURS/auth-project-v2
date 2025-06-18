<script setup>

import TodoItem from "@/components/todos/TodoItem.vue";
</script>

<template>
  <h2>todos</h2>
  <TodoItem title="huy pojesat" :completed="true" :created-at="Date.now()" />
</template>

<style scoped>

</style>