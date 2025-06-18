<script setup>
import DialogContainer from "@/components/DialogContainer.vue";

defineProps({
  close: Function
});
</script>

<template>
  <!-- сюда рикролл засунуть -->
  <DialogContainer @click="close">
    <iframe width="500" height="500" src="https://www.youtube.com/embed/DLzxrzFCyOs?hl=en_US&version=3&rel=0&autoplay=1&controls=0&modestbranding=1&showinfo=0" allowfullscreen></iframe>
  </DialogContainer>
</template>