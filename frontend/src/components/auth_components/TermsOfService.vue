<script setup>
defineProps({
  close: Function
});
</script>

<template>
  <!-- сюда рикролл засунуть -->
  <div class="tos" @click="close">
    <iframe width="500" height="500" src="https://www.youtube.com/embed/DLzxrzFCyOs?hl=en_US&version=3&rel=0&autoplay=1&controls=0&modestbranding=1&showinfo=0" allowfullscreen></iframe>
  </div>
</template>

<style scoped>
.tos {
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

  iframe {
    padding: 12px;

    background-color: var(--color-primary);
    border: 2px solid var(--color-secondary);
  }
}
</style>