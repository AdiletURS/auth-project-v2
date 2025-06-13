<script setup>

</script>

<template>
  <nav class="navbar">
    <RouterLink class="logo_link" to="/">
      <img style="filter: invert(100%)" src="@/assets/logo.png" alt="SomeOrdinaryCompany logo">
      <span>SomeOrdinaryCompany</span>
    </RouterLink>

    <ul class="links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li><RouterLink id="link_login" to="/login">Login</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0 20%;

  display: flex;
  justify-content: space-between;

  background-color: var(--color-background-mute);
  box-shadow: 0 5px 5px rgba(0, 0, 0, .4);
}

.logo_link {
  display: flex;
  align-items: center;
  gap: 4px;

  color: white;
  text-decoration: none;
}
.logo_link img {
  width: 60px;
}

.links {
  display: flex;
  align-items: center;
  gap: 10px;

  list-style: none;
}
.links a {
  display: inline-block;
  height: 55px;

  color: white;
  text-decoration: none;
  line-height: 55px;
}
.links a:hover {
  text-decoration: underline;
}

#link_login {
  width: 80px;
  height: 40px;
  text-align: center;

  background-color: var(--vt-c-indigo);
  border-radius: 100px;

  text-decoration: none;
  line-height: 40px;
}
#link_login:hover {
  font-weight: bold;
}
</style>