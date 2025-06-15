<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />
  <div id="router_view">
    <RouterView />
  </div>
  <Footer />
</template>

<style scoped>
#router_view {
  padding: 32px 200px;
}

/* Tablet */
@media (max-width: 1200px) {
  #router_view {
    padding: 10px var(--padding-inline-tablet);
  }
}

/* Phone */
@media (max-width: 850px) {
  #router_view {
    padding: 10px var(--padding-inline-mobile);
  }
}
</style>