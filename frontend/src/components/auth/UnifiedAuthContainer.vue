<script setup>
import {reactive, ref} from "vue";
import SignUpForm from "@/components/auth/SignUpForm.vue";
import SignInForm from "@/components/auth/SignInForm.vue";

const props = defineProps({
  formType: {
    type: String,
    default: "sign-in"
  }
});

const state = reactive({
  title: props.formType.toUpperCase(),
  formType: props.formType
});

const setFormType = (type) => {
  state.formType = type;
  state.title = type.toUpperCase();
}
</script>

<template>
  <div class="auth_container">
    <h2 class="title">{{ state.title }}</h2>
    <div class="form_cont">
      <SignInForm :setForm="setFormType" v-if="state.formType === 'sign-in'"/>
      <SignUpForm v-else />
    </div>
  </div>
</template>

<style scoped>
.auth_container {
  width: 500px;
  padding: 24px;
  position: relative;

  background-color: var(--color-primary);
  border: 2px solid var(--color-secondary);
  box-shadow: 0 0 100px var(--color-primary);

}

.title {
  position: absolute;
  bottom: 0;
  left: -50px;

  text-transform: uppercase;
  writing-mode: tb-rl;
  transform: rotate(180deg);
}

.form_cont:deep(form) {
  display: flex;
  flex-direction: column;
  justify-content: right;
  gap: 8px;

  &:first-child {
    margin-top: -12px;
  }
  button {
    align-self: flex-end;
    width: 50%;
  }
}
</style>