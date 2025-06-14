<script setup>
import {onBeforeMount, ref} from "vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

const introPhrases = [
  "the best shirts in za warudo",
  "shirts only for gigachads",
  "very unordinary shirts, even tho, we call them \"ordinary\"",
  "shirts in which you'll look much cooler"
];

const pickedPhrase = ref(0);

onBeforeMount(() => {
  pickedPhrase.value = Math.floor(Math.random() * introPhrases.length);
});
</script>

<template>
  <section id="intro">
    <div class="greet">
      <h2>sup, nerd. this is...</h2>
      <img class="logo" src="@/assets/logo_full.png" alt="Ordinary Nation Logo">
      <div>
        <i style="color: rgba(0, 0, 0, .3)">{{ introPhrases[pickedPhrase] }}</i>
      </div>
    </div>

    <InfiniteScroll>
      <img src="@/assets/showcase/shirt_doom_cum.jpg" alt="Doom CUM Shirt">
      <img src="@/assets/showcase/shirt_evil_jonkler.jpg" alt="Evil Jonkler Shirt">
      <img src="@/assets/showcase/shirt_hentai_inside.jpg" alt="Intel Inside Shirt">
      <img src="@/assets/showcase/shirt_pills.jpg" alt="Pills Shirt">
      <img src="@/assets/showcase/shirt_teto_pear.jpg" alt="Teto Pear Shirt">
    </InfiniteScroll>
  </section>
</template>

<style scoped>
#intro {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.greet {
  margin-bottom: 22px;
}

.logo {
  image-rendering: optimizeSpeed;
  width: 60%;

  @media (max-width: 850px) {
    width: 100%;
  }
}
</style>