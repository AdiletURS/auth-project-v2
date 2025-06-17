<script setup>
import {reactive} from "vue";
import {vOnClickOutside} from "@vueuse/components";
import SignUpForm from "@/components/auth_components/SignUpForm.vue";
import SignInForm from "@/components/auth_components/SignInForm.vue";

const props = defineProps({
  formType: {
    type: String,
    default: "sign-in"
  },
  close: Function
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
  <div class="auth_container" v-on-click-outside="close">
    <button id="btn_close" @click="close">close</button>

    <h2 class="title">{{ state.title }}</h2>
    <div class="form_cont">
      <SignInForm :setForm="setFormType" v-if="state.formType === 'sign-in'"/>
      <SignUpForm :setForm="setFormType" v-else />
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
}

.title {
  position: absolute;
  bottom: 0;
  left: -50px;

  text-transform: uppercase;
  writing-mode: tb-rl;
  transform: rotate(180deg);
}

#btn_close {
  position: fixed;
  right: 24px;
  top: 24px;
}

:deep(form) {
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
  span svg {
    width: 32px;
    height: 100%;
  }
}

@media (min-width: 850px) {
  #btn_close {
    display: none;
  }
}

/* Phone */
@media (max-width: 850px) {
  .auth_container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;

    border: none;
  }

  .title {
    position: static;
    margin-bottom: 24px;

    writing-mode: lr;
    transform: none;
  }
}
</style>