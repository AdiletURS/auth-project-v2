<script setup>

</script>

<template>
  <div class="newsletter">
    <div class="title">
      <h2>join our newsletter</h2>
      <p>be the first to know about new collections and exclusive offers.</p>
    </div>

    <form @submit.prevent="">
      <label for="email">email</label><br>
      <input type="email" id="name" name="name" placeholder="type ur email">
      <button style="margin-left: 4px" type="submit">subscribe</button>
    </form>
  </div>
</template>

<style scoped>
.newsletter {
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 850px) {
    padding: var(--padding-inline-mobile);

    form {
      display: flex;
      flex-direction: column;
      gap: 4px;

      button {
        margin-left: 0 !important;
      }
    }
  }
}

.title {
  margin-bottom: 24px;
  text-align: center;
}
</style>