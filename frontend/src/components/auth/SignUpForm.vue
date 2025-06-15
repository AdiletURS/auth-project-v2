<script setup>

</script>

<template>
  <form @submit.prevent="">
    <label for="username">username</label>
    <input type="text" id="username" name="username" placeholder="ur username">

    <label for="password">password</label>
    <input type="password" id="password" name="password" placeholder="ur password">
    <label for="password-r">password again</label>
    <input type="password" id="password-r" name="password-r" placeholder="repeat ur password">

    <label for="agreement">do you accept our <a href="#">terms of agreement</a>?</label>
    <input type="checkbox" id="agreement" name="agreement">

    <button type="submit">sign up</button>
  </form>
</template>

<style scoped>

</style>