<script setup>
import {Icon} from "@iconify/vue";
import {onMounted, watch, ref, useTemplateRef, watchEffect, computed} from "vue";
import {register} from "@/api/services/auth.js";
import TermsOfService from "@/components/auth_components/TermsOfService.vue";
import PasswordField from "@/components/auth_components/PasswordField.vue";
import {useSignUpValidate} from "@/composables/useSignUpValidate.js";

const props = defineProps({
  setForm: Function
});

const inputName = useTemplateRef("i-name");
const inputPass = useTemplateRef("i-pass");
const inputPassRep = useTemplateRef("i-pass-r");

const showTOS = ref(false);

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const checkAgreed = ref(false);
const {
  isUsernameValid,
  isPasswordValid,
  isRepeatPassValid,
  hasAgreed
} = useSignUpValidate(username, password, repeatPassword, checkAgreed);

const isLoading = ref(false);
const serverError = ref("");
const validationErrors = ref([]);

const submitForm = () => {
  if (validationErrors.value.length !== 0) {
    console.warn("there are failed validations...")
    return;
  }

  isLoading.value = true;

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
          serverError.value = err.response.data.message;
        } else {
          serverError.value = "Failed... Check console for stack trace."
        }
        console.error(err.message);
      });
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="username">username</label>
    <input v-model="username" ref="i-name" type="text" id="username" name="username" placeholder="ur username">

    <PasswordField ref="i-pass" v-model="password" />
    <PasswordField ref="i-pass-r" v-model="repeatPassword" />

    <div class="agreement">
      <input v-model="checkAgreed" type="checkbox" id="agreement" name="agreement">
      <label for="agreement">do you accept our <a href="#" @click="() => showTOS = true">terms of agreement</a>?</label>
    </div>

    <button :disabled="isLoading || validationErrors.length !== 0" type="submit">
      <span v-if="!isLoading">sign up</span>
      <span v-else><Icon icon="svg-spinners:bars-fade" /></span>
    </button>

    <span v-for="err in validationErrors" class="error_message">{{ err }}</span>
    <span class="error_message">{{ serverError }}</span>

    <!--  ToS  -->
    <TermsOfService v-if="showTOS" :close="() => showTOS = false" />

    <h6>{{ isUsernameValid }}</h6>
    <h6>{{ isPasswordValid }}</h6>
    <h6>{{ isRepeatPassValid }}</h6>
    <h6>{{ hasAgreed }}</h6>
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