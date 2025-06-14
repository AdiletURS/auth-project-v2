<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div id="router_view">
    <RouterView />
  </div>
</template>

<style scoped>
#router_view {
  padding: 10px 200px;
}
@media (max-width: 1200px) {
  #router_view {
    padding: 10px 50px;
  }
}
@media (max-width: 850px) {
  #router_view {
    padding: 10px 10px;
  }
}
</style>