<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
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
  <section>
    <div class="div1">
      <h4>sup, nerd</h4>
      <h2>this is Ordinary Nation</h2>
      <div>
        <p>{{ introPhrases[pickedPhrase] }}</p>
      </div>
    </div>
  </section>

  <section>
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
  margin-top: 40vh;
}
</style>