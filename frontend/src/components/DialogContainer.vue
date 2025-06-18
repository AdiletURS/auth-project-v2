<script setup>

</script>

<template>
  <div class="container">
    <div class="content">
      <slot class="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: brightness(.5);
}

.content {
  padding: 24px;

  border: 2px solid var(--color-secondary);
  background-color: var(--color-primary);
}
</style>