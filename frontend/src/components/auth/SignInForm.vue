<script setup>

</script>

<template>
  <form @submit.prevent="">
    <label for="username">username</label>
    <input type="text" id="username" name="username" placeholder="ur username">

    <label for="password">password</label>
    <input type="password" id="password" name="password" placeholder="ur password">

    <button type="submit">sign in</button>
  </form>
</template>

<style scoped>

</style>