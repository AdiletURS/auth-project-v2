<script setup>
import {Icon} from "@iconify/vue";
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <Icon icon="icon-park-twotone:t-shirt"/>
      <span>Ordinary Nation</span>
    </div>

    <table class="links">
      <tr>
        <td>
          <RouterLink to="/">HOME</RouterLink>
        </td>
        <td>
          <RouterLink to="/shop">SHOP</RouterLink>
        </td>
<!--        <td>
          <RouterLink to="/admin">ADMIN</RouterLink>
        </td>-->
        <td id="btn_login"><a href="#">
          <Icon icon="material-symbols:login-sharp"/>
        </a></td>
      </tr>
    </table>
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

table, td {
  height: 100%;

  border-inline: 2px solid var(--color-secondary);
  border-collapse: collapse;
}

td {
  width: 120px;
  text-align: center;
}

a {
  width:100%;
  height:100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  color: var(--color-secondary);

  &:hover { text-decoration: underline }
}

#btn_login {
  width: 60px;
}
</style>