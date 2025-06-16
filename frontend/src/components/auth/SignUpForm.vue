<script setup>
import {ref} from "vue";
import {register} from "../../../api/lib/auth.js";

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const checkAgreed = ref(false);

const isLoading = ref(false);

const submitForm = () => {
  const userObject = {
    login: username.value,
    password: password.value
  }

  isLoading.value = true
  register(userObject)
      .then(res => {
        console.log(res)
        isLoading.value = false;
      })
      .catch(err => {
        isLoading.value = false;
      });
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="username">username</label>
    <input v-model="username" type="text" id="username" name="username" placeholder="ur username">

    <label for="password">password</label>
    <input v-model="password" type="password" id="password" name="password" placeholder="ur password">
    <label for="password_r">password again</label>
    <input v-model="repeatPassword" type="password" id="password_r" name="password_r" placeholder="repeat ur password">

    <div class="agreement">
      <input v-model="checkAgreed" type="checkbox" id="agreement" name="agreement">
      <label for="agreement">do you accept our <a href="#">terms of agreement</a>?</label>
    </div>

    <button :disabled="isLoading" type="submit">
      <span v-if="!isLoading">sign up</span>
      <span v-else>loading</span>
    </button>
  </form>
</template>

<style scoped>
.agreement label, input[type="checkbox"] {
  margin-right: 12px;
  display: inline-block;
  vertical-align: middle;
}

.agreement label {
  width: 80%;
}
</style>