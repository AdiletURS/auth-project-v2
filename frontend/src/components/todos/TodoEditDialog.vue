<script setup>
import {ref} from "vue";

const props = defineProps({
  close: Function,
  submitEdit: Function,
  todoObject: Object
})

const title = ref(props.todoObject.title);

const submit = () => {
  props.submitEdit(title.value);
  props.close();
}

</script>

<template>
  <div class="container">
    <form class="edit_dialog" @submit.prevent="">
      <label for="edit_area">edit item</label>
      <textarea v-model="title" id="edit_area">{{ title }}</textarea>

      <div class="buttons">
        <button @click="close" type="button">cancel</button>
        <button @click="submit" type="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: brightness(.5);
}

.edit_dialog {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  border: 2px solid var(--color-secondary);
  background-color: var(--color-primary);
}

.buttons {
  display: flex;
  justify-content: end;
  gap: 4px;
}

#edit_area {
  min-width: 450px;
  min-height: 300px;

  font-size: .6em;
}
</style>