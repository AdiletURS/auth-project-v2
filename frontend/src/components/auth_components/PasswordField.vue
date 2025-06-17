<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String
})

const isInvalid = ref(false);
const setInvalid = (bool = false) => {
  isInvalid.value = !isInvalid.value
}

const emit = defineEmits(['update:modelValue']);
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const fieldType = ref("password");
const switchVisibility = () =>
    fieldType.value = fieldType.value === "password" ? "text" : "password";

defineExpose({
  setInvalid
});
</script>

<template>
  <div class="password_field">
    <label for="password">password</label>
    <input :value="modelValue" @input="handleInput" :type="fieldType" id="password" name="password"
           :placeholder="placeholder">
    <button @click="switchVisibility" type="button" class="toggle">
      <Icon v-if="fieldType === 'password'" icon="material-symbols:visibility-outline"/>
      <Icon v-else icon="material-symbols:visibility-off-outline"/>
    </button>
  </div>
</template>

<style scoped>
.password_field {
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-right: 55px;
  }
}

.invalid {
  border-color: var(--color-invalid);
  &:focus {
    box-shadow: inset 0 0 0 1px var(--color-invalid);
  }
}

.toggle {
  width: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>