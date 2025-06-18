<script setup>
defineProps({
  title: String,
  completed: Boolean,
  createdAt: Date
})
</script>

<template>
  <div class="todo_item">
    <div class="info">
      <p class="title">{{ title }}</p>
      <p class="status">completed: {{ completed }}</p>
      <p class="creation_date">created at: {{ createdAt }}</p>
    </div>

    <div class="controls">
      <button class="btn_status_changer">mark as complete</button>
      <button class="btn_edit">edit</button>
    </div>
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