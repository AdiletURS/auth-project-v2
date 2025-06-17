<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const props = defineProps({
  modelValue: String
})

const fieldType = ref("password");

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const switchVisibility = () =>
    fieldType.value = fieldType.value === "password" ? "text" : "password";
</script>

<template>
  <div class="password_field">
    <label for="password">password</label>
    <input :value="modelValue" @input="handleInput" ref="i-pass" :type="fieldType" id="password" name="password"
           placeholder="ur password">
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
}

.toggle {
  width: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>