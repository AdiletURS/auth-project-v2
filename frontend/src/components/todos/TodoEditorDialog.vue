<script setup>
import {ref} from "vue";
import DialogContainer from "@/components/DialogContainer.vue";

const props = defineProps({
  label: {
    type: String,
    default: "edit item"
  },
  close: Function,
  submitEdit: Function,
  todoObject: {
    type: Object,
    default: {
      title: ""
    }
  }
})

const title = ref(props.todoObject.title);

const submit = () => {
  props.submitEdit({ title: title.value, completed: props.todoObject.completed });
  props.close();
}

</script>

<template>
  <DialogContainer>
    <form class="edit_dialog" @submit.prevent="">
      <label for="edit_area">{{ label }}</label>
      <textarea v-model="title" id="edit_area">{{ title }}</textarea>

      <div class="buttons">
        <button @click="close" type="button">cancel</button>
        <button @click="submit" type="submit">submit</button>
      </div>
    </form>
  </DialogContainer>
</template>

<style scoped>
.edit_dialog {
  display: flex;
  flex-direction: column;
  gap: 4px;
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