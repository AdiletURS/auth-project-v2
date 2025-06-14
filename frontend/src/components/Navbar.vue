<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
}

</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <Icon icon="icon-park-twotone:t-shirt"/>
      <span>Ordinary Nation</span>
    </div>

    <button id="mobile_menu" @click="toggleDropdown"><Icon icon="material-symbols:menu" /></button>

    <ul v-show="showDropdown" class="links">
      <li><RouterLink to="/">HOME</RouterLink></li>
      <li><RouterLink to="/shop">SHOP</RouterLink></li>
      <li id="link_login" class="small"><a href="#"><Icon icon="material-symbols:login-sharp"/></a></li>
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

#mobile_menu {
  width: 50px;
  height: 90%;
  display: none;

  border: 2px solid var(--color-secondary);

  background-color: var(--color-primary);

  svg {
    width: 100%;
    height: 100%;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 40px;
    height: 40px;
  }
}

.links {
  padding: 0;
  width: 340px;
  height: 100%;

  display: flex;
  align-items: center;

  border-inline: 2px solid var(--color-secondary);

  list-style-type: none;

  li {
    height: 100%;

    flex: 1;
    text-align: center;
    border-right: 2px solid var(--color-secondary);
    transition: flex-grow .1s linear;
    overflow: hidden;

    &:last-child { border-right: none }
    &:hover { flex-grow: 1.1 }
    &.small {
      flex-grow: .4;
      &:hover { flex-grow: .45 }
    }
  }
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

/* Desktop* */
@media (min-width: 850px) {
  .links { display: flex !important /* *Added in order to ignore v-show directive */ }
}

/* Tablet */
@media (max-width: 1200px) {
  .navbar {
    padding-inline: 50px;
  }
}

/* Phone */
@media (max-width: 850px) {
  .navbar {
    padding-inline: 10px;
  }

  .logo svg {
    width: 30px;
    height: 30px;
  }

  #mobile_menu {
    display: block;
  }

  .links {
    width: 100%;
    height: auto;
    padding: 12px;

    position: absolute;
    left: 0;
    top: 60px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    background-color: var(--color-primary);

    border: none;
    border-bottom: 2px solid var(--color-secondary);

    li {
      width: 100%;
      border: none;
    }
    a {
      width: 100%;
      text-align: end;
    }
    .small {
      svg {
        display: none;
      }
      &:hover { text-decoration: underline }
    }
    #link_login:after {
      content: "LOGIN";
    }
  }
}

</style>