<script setup>
import {onMounted, reactive, ref} from "vue";
import {getProfile} from "@/api/services/profile.js";
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import {hasAnyTokens, setTokens} from "@/api/apiClient.js";

const router = useRouter();

const state = reactive({
  id: -1,
  username: "",
  createdAt: ""
});

const isLoading = ref(true);
const errorMsg = ref("");

const logout = () => {
  console.warn("logging out...");

  setTokens(); // remove the tokens

  router.push({ name: "home" })
      .then(() => router.go()); // redirect and reload
}

onMounted(() => {
  if (!hasAnyTokens()) {
    console.warn("no tokens, going back home...");

    router.push({ name: "home" })
        .then(() => router.go(1)); // redirect
    return;
  }

  isLoading.value = true;
  errorMsg.value = "";

  getProfile()
      .then(res => {
        console.log(res);
        const { id, login, created_at } = res.data;
        state.id = id;
        state.username = login;
        state.createdAt = created_at;
      })
      .catch(err => {
        isLoading.value = false;

        if (err.response && err.response.data) {
          errorMsg.value = err.response.data.message;
        } else {
          errorMsg.value = "Failed... Check console for stack trace."
        }
        console.error(err.message);
      });
});

</script>

<template>
  <div v-if="state.id !== -1">
    <h2>dashboard</h2>
    <p>username: {{ state.username }}, {{ state.id }}</p>
    <p>created at: {{ state.createdAt }}</p>

    <button @click="logout">logout</button>
  </div>

  <Icon v-else icon="svg-spinners:bars-fade" />
</template>

<style scoped>

</style>