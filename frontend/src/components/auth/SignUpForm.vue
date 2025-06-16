<script setup>
import {ref} from "vue";
import {register} from "@/api/services/auth.js";

const props = defineProps({
  setForm: Function
});

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const checkAgreed = ref(false);

const isLoading = ref(false);
const errorMsg = ref("");

const submitForm = () => {
  isLoading.value = true
  errorMsg.value = "";

  const userObject = {
    login: username.value,
    password: password.value
  }

  register(userObject)
      .then(res => {
        console.log(res)
        isLoading.value = false;

        if (res.status === 201) {
          props.setForm("sign-in");
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

    <span class="error_message">{{ errorMsg }}</span>
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

.error_message {
  font-size: .6em;
  color: darkred;
}
</style>