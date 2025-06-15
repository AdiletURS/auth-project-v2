<script setup>
defineProps({
  setForm: Function
})
</script>

<template>
  <form @submit.prevent="">
    <label for="username">username</label>
    <input type="text" id="username" name="username" placeholder="ur username">

    <label for="password">password</label>
    <input type="password" id="password" name="password" placeholder="ur password">

    <div class="buttons">
      <a @click="setForm('sign-up')" href="#">create account</a>
      <button type="submit">sign in</button>
    </div>
  </form>
</template>

<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-size: .6em;
  }
}
</style>