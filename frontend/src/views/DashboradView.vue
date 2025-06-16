<script setup>
import {onMounted, reactive} from "vue";
import {getProfile} from "@/api/lib/profile.js";

const state = reactive({
  id: -1,
  username: "",
  createdAt: ""
});

onMounted(() => {
  getProfile()
      .then(res => {
        console.log(res);
        const { id, login, created_at } = res.data;
        state.id = id;
        state.username = login;
        state.createdAt = created_at;
      })
      .catch(err => {
        console.log(err);
      });
});

</script>

<template>
  <h2>dashboard</h2>
  <p>username: {{ state.username }}, {{ state.id }}</p>
  <p>created at: {{ state.createdAt }}</p>
</template>

<style scoped>

</style>