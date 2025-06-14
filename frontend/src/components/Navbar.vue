<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <Icon icon="icon-park-twotone:t-shirt" />
      <span>Ordinary Nation</span>
    </div>

    <ul class="links">
      <li><RouterLink to="/">HOME</RouterLink></li>
      <li><RouterLink to="/shop">SHOP</RouterLink></li>
      <li><a href="#"><Icon icon="material-symbols:login-sharp" /></a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  height: 60px;
  padding-inline: 200px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid var(--color-secondary);
}

.links {
  height: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  list-style-type: none;
}

li {
  width: 100px;
  height: 100%;

  line-height: 60px;
  text-align: center;
  text-decoration: none;
  color: var(--color-secondary);

  border-inline: 2px solid var(--color-secondary);

  transition: .1s;
}
li:hover {
  width: 110px;
}
li:hover a {
  text-decoration: underline;
}

a {
  text-decoration: none;
  color: var(--color-secondary)
}
</style>