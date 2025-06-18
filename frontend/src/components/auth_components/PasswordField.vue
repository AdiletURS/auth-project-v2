<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const props = defineProps({
  valid: {
    type: Boolean,
    default: true
  },
  placeholder: String
})

const emit = defineEmits(['update:modelValue']);
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const fieldType = ref("password");
const switchVisibility = () =>
    fieldType.value = fieldType.value === "password" ? "text" : "password";
</script>

<template>
  <div class="password_field">
    <label for="password">password</label>
    <input @input="handleInput" :type="fieldType" id="password" name="password"
           :placeholder="placeholder"
           :class="props.valid ? '' : 'invalid'">
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