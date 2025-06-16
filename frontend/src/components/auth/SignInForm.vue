<script setup>
import {ref} from "vue";
import {login} from "@/api/lib/auth.js";

defineProps({
  setForm: Function
})

const username = ref("");
const password = ref("");

const isLoading = ref(false);
const errorMsg = ref("");

const submitForm = () => {
  isLoading.value = true;
  errorMsg.value = "";

  login({
    login: username.value,
    password: password.value
  })
      .then(res => {
        isLoading.value = false;
        if (res.status === 200) {
          const user = res.data;

          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("refreshToken", user.refreshToken);
          console.log("successfully logged in");
        }
      })
      .catch(err => {
        isLoading.value = false;
        errorMsg.value = err.response.data.message;
      });
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="username">username</label>
    <input v-model="username" type="text" id="username" name="username" placeholder="ur username">

    <label for="password">password</label>
    <input v-model="password" type="password" id="password" name="password" placeholder="ur password">

    <div class="buttons">
      <a @click="setForm('sign-up')" href="#">create account</a>
      <button :disabled="isLoading" type="submit">sign in</button>
    </div>

    <!--  TODO: перенести в UnifiedAuthContainer  -->
    <span class="error_message">{{ errorMsg }}</span>
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

.error_message {
  font-size: .6em;
  color: darkred;
}
</style>