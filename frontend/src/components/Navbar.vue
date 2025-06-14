<script setup>
import {Icon} from "@iconify/vue";
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <Icon icon="icon-park-twotone:t-shirt"/>
      <span>Ordinary Nation</span>
    </div>

    <ul class="links">
      <li><RouterLink to="/">HOME</RouterLink></li>
      <li><RouterLink to="/shop">SHOP</RouterLink></li>
      <li class="small"><a href="#"><Icon icon="material-symbols:login-sharp"/></a></li>
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
  padding: 0;
  width: 340px;
  height: 100%;

  display: flex;
  align-items: center;

  border-inline: 2px solid var(--color-secondary);

  list-style-type: none;
}
li {
  height: 100%;

  flex: 1;
  text-align: center;
  border-right: 2px solid var(--color-secondary);
  transition: flex-grow .1s linear;
  overflow: hidden;
}
li:last-child {
  border-right: none;
}
li:hover {
  flex-grow: 1.1;
}
li.small {
  flex-grow: .4;
  &:hover { flex-grow: .45 }
}

a {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  color: var(--color-secondary);

  &:hover { text-decoration: underline }
}
</style>