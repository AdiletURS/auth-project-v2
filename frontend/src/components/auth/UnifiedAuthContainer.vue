<script setup>

</script>

<template>
  <div class="layout">
    <div class="auth_container">
      <h2 class="title">title</h2>
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  backdrop-filter: blur(12px);
}

.auth_container {
  width: 500px;
  padding: 24px;
  position: relative;

  background-color: var(--color-primary);
  border: 2px solid var(--color-secondary);
  box-shadow: 0 0 100px var(--color-primary);

}

.title {
  position: absolute;
  bottom: 0;
  left: -50px;

  text-transform: uppercase;
  writing-mode: tb-rl;
  transform: rotate(180deg);
}

.slot:deep(form) {
  display: flex;
  flex-direction: column;
  justify-content: right;
  gap: 8px;

  &:first-child {
    margin-top: -12px;
  }
  button {
    align-self: flex-end;
    width: 50%;
  }
}
</style>