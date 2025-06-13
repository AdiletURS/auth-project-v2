<script setup>

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <section class="welcome">
    <div class="text_block">
      <span>Добро пожаловать в</span>
      <h1>SomeOrdinaryCompany</h1>
    </div>

    <RouterLink to="/reg"><button>Зарегистрироваться</button></RouterLink>
    <p>или <RouterLink to="/login">войти</RouterLink></p>
  </section>
</template>

<style scoped>
.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
}

.text_block {
  margin-bottom: 12px;
}
</style>