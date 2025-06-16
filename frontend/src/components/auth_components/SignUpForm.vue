<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import {register} from "@/api/services/auth.js";
import TermsOfService from "@/components/auth_components/TermsOfService.vue";

const props = defineProps({
  setForm: Function
});

const showTOS = ref(false);

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const checkAgreed = ref(false);

const isLoading = ref(false);
const errorMsg = ref("");

const submitForm = () => {
  if (!username.value || !password.value) {
    errorMsg.value = "Username/Password can't be empty."
    return;
  }
  if (password.value !== repeatPassword.value) {
    errorMsg.value = "Passwords are not similar.";
    return;
  }
  if (!checkAgreed.value) {
    errorMsg.value = "You have to agree the ToS first.";
    return;
  }

  isLoading.value = true;
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
          alert("Account was created. Please sign in.")
        }
      })
      .catch(err => {
        isLoading.value = false;

        if (err.response && err.response.data) {
          errorMsg.value = err.response.data.message;
        } else {
          errorMsg.value = "Failed... Check console for stack trace."
        }
        console.error(err.message);
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
      <label for="agreement">do you accept our <a href="#" @click="() => showTOS = true">terms of agreement</a>?</label>
    </div>

    <button :disabled="isLoading" type="submit">
      <span v-if="!isLoading">sign up</span>
      <span v-else><Icon icon="svg-spinners:bars-fade" /></span>
    </button>

    <span class="error_message">{{ errorMsg }}</span>

    <!--  ToS  -->
    <TermsOfService v-if="showTOS" :close="() => showTOS = false" />
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