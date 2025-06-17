<script setup>
import {Icon} from "@iconify/vue";
import {onMounted, watch, ref, useTemplateRef, watchEffect} from "vue";
import {register} from "@/api/services/auth.js";
import TermsOfService from "@/components/auth_components/TermsOfService.vue";
import PasswordField from "@/components/auth_components/PasswordField.vue";

const props = defineProps({
  setForm: Function
});

const inputName = useTemplateRef("i-name");
const inputPass = useTemplateRef("i-pass");
const inputPassRep = useTemplateRef("i-pass-r");

const showTOS = ref(false);

const username = ref("");
watch(username, (username) => {
  // if (username)
})

const password = ref("");
const repeatPassword = ref("");
const checkAgreed = ref(false);

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

onMounted(() => {
  watchEffect(() => {
    // todo: надо бы в composable запихать, но мне лень.
    validationErrors.value = [];
    const is_valid = true
    // Username presence
    if (!username.value) {
      inputName.value.style = "border-color: red";
      validationErrors.value.push("Username can't be empty.");
    } else inputName.value.style = "border-color: var(--color-secondary)";

    // Password length
    if (password.value.length < 6) {
      inputPass.value.setBorderColor("red");
      validationErrors.value.push("Password is too short.")
    } else {
      inputPass.value.setBorderColor();
    }

    // Password similarity
    if (password.value !== repeatPassword.value) {
      inputPassRep.value.setBorderColor("red");
      validationErrors.value.push("Passwords are not similar.")
    } else {
      inputPassRep.value.setBorderColor();
    }
    // ToS check presence
    if (!checkAgreed.value) {
      validationErrors.value.push("You have to agree with the ToS.")
    }
  });
})
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